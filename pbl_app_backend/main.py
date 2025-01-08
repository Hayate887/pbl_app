# This project is licensed under the MIT License - see the LICENSE file for details.

import io
import os
import cv2
import numpy as np
from fastapi import Depends, FastAPI, File, HTTPException, UploadFile, Form, Body
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from PIL import Image
from sqlalchemy.orm import Session

import models
from database import add_image, get_images, get_db
from retinaface import RetinaFace

from typing import Union
from uuid import UUID

import jwt
from dotenv import load_dotenv
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer


app = FastAPI()
load_dotenv()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


SECRET_KEY = os.getenv("SECRET_KEY")

async def get_auth_user_id(
    authorization: HTTPAuthorizationCredentials = Depends(HTTPBearer()),
):
    token = authorization.credentials
    payload = jwt.decode(
        token,
        SECRET_KEY,
        audience="authenticated",
        algorithms=["HS256"],
        )
    
    return payload.get("sub")
   

"""アナグリフ画像生成"""


@app.get("/")
async def root():
    return {"message": "Hello World From Fast API!"}


# ファイル形式の検証
def is_valid_image(file: UploadFile) -> bool:
    valid_formats = ["image/jpeg", "image/png", "image/jpg"]
    return file.content_type in valid_formats


# 顔検出
async def face_detect(img):
    # アップロードされたファイルを読み込む
    img_np = np.array(img)

    # RGBからBGRに変換
    img_np = cv2.cvtColor(img_np, cv2.COLOR_RGB2BGR)

    # 顔検出を実行
    results = RetinaFace.detect_faces(img_np)

    if len(results) > 0:
        return False
    else:
        return True


# カラーアナグリフ画像（通常版）
def create_anaglyph_image(
    left_img: np.ndarray,
    right_img: np.ndarray,
) -> np.ndarray:
    # 輝度調整（コントラストと明るさ）
    left_img = cv2.convertScaleAbs(left_img, alpha=1.2, beta=15)
    right_img = cv2.convertScaleAbs(right_img, alpha=1.2, beta=15)

    # パディングを追加して画像端の補完
    padding = 150
    padded_right_img = np.pad(
        right_img, ((0, 0), (padding, padding), (0, 0)), mode="edge"
    )

    # 画像をずらす
    shifted_right_img = np.roll(padded_right_img, padding, axis=1)

    # パディングを除去
    shifted_right_img = shifted_right_img[:, padding:-padding, :]

    # ガウシアンフィルタを適用して、エッジを滑らかにする
    shifted_right_img = cv2.GaussianBlur(shifted_right_img, (5, 5), 0)

    # アナグリフ画像の生成
    anaglyph_img = np.zeros_like(left_img)
    anaglyph_img[:, :, 0] = left_img[:, :, 2]
    anaglyph_img[:, :, 1] = shifted_right_img[:, :, 1]
    anaglyph_img[:, :, 2] = shifted_right_img[:, :, 0]

    # 右端のトリミング
    anaglyph_img = anaglyph_img[:, padding:-padding, :]


    return anaglyph_img


@app.post("/anaglyph")
async def upload_file(
    file: UploadFile = File(...),
    user_email: str=Form(...),
    session: Session = Depends(get_db),
):
    # ファイル形式のチェック
    if not is_valid_image(file):
        raise HTTPException(status_code=400, detail="無効な画像ファイル形式")

    left_img = Image.open(io.BytesIO(await file.read()))
    right_img = left_img.copy()

    for img in [left_img, right_img]:
        check_face = await face_detect(img)
        if check_face is False:
            raise HTTPException(status_code=400, detail="この画像は使用できません")

    left_img_np = np.array(left_img.convert("RGB"))
    right_img_np = np.array(right_img.convert("RGB"))

    # アナグリフ画像を生成
    anaglyph_img_np = create_anaglyph_image(left_img_np, right_img_np)

    # numpy配列をPIL画像に変換
    anaglyph_img = Image.fromarray(anaglyph_img_np)

    # バイナリストリームに保存
    img_byte_arr = io.BytesIO()
    anaglyph_img.save(img_byte_arr, format="PNG")
    img_byte_arr.seek(0)

    image_bytes = img_byte_arr.getvalue()
    add_image(user_email, image_bytes,session)

    return StreamingResponse(img_byte_arr, media_type="image/png")


# グレーアナグリフ（通常版）
def create_anaglyph_image_2(
    left_img: np.ndarray,
    right_img: np.ndarray,
) -> np.ndarray:
    # 輝度調整
    left_img = cv2.convertScaleAbs(left_img, alpha=1.2, beta=15)
    right_img = cv2.convertScaleAbs(right_img, alpha=1.2, beta=15)

    # パディングを追加して画像端の補完
    padding = 150
    padded_right_img = np.pad(
        right_img, ((0, 0), (padding, padding), (0, 0)), mode="edge"
    )

    # 画像をずらす
    shifted_right_img = np.roll(padded_right_img, padding, axis=1)

    # パディングを除去
    shifted_right_img = shifted_right_img[:, padding:-padding, :]

    # ガウシアンフィルタを適用して、エッジを滑らかにする
    shifted_right_img = cv2.GaussianBlur(shifted_right_img, (5, 5), 0)

    # アナグリフ画像の生成
    anaglyph_img = np.zeros_like(left_img)
    anaglyph_img[:, :, 0] = left_img[:, :, 2]
    anaglyph_img[:, :, 1] = shifted_right_img[:, :, 1]
    anaglyph_img[:, :, 2] = shifted_right_img[:, :, 0]

    # 右端のトリミング
    anaglyph_img = anaglyph_img[:, padding:-padding, :]

    return anaglyph_img


@app.post("/gray/anaglyph")
async def file(
    file: UploadFile = File(...),
    user_email: str=Form(...),
    session: Session = Depends(get_db),
):
   
    # ファイル形式のチェック
    if not is_valid_image(file):
        raise HTTPException(status_code=400, detail="無効な画像ファイル形式")

    left_img = Image.open(io.BytesIO(await file.read())).convert("L")
    right_img = left_img.copy()

    for img in [left_img, right_img]:
        check_face = await face_detect(img)
        if check_face is False:
            raise HTTPException(status_code=400, detail="この画像は使用できません")

    left_img_np = np.array(left_img.convert("RGB"))
    right_img_np = np.array(right_img.convert("RGB"))

    # アナグリフ画像を生成
    anaglyph_img_np = create_anaglyph_image_2(left_img_np, right_img_np)

    # numpy配列をPIL画像に変換
    anaglyph_img = Image.fromarray(anaglyph_img_np)

    # バイナリストリームに保存
    img_byte_arr = io.BytesIO()
    anaglyph_img.save(img_byte_arr, format="PNG")
    img_byte_arr.seek(0)

    image_bytes = img_byte_arr.getvalue()
    add_image(user_email, image_bytes,session)

    return StreamingResponse(img_byte_arr, media_type="image/png")


@app.get("/get/{id}/image")
def get_image(id: int, session: Session = Depends(get_db),):
    return get_images(id, session)
