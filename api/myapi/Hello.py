from PIL import Image, ImageDraw, ImageFont
import threading
import os
import time
from queue import Queue
q=Queue()
t_num=[0]
ft=ImageFont.truetype("/root/projects/api/玉米诗情体.TTF", 72)
#def myasync(f):
    #def wrapper(*args, **kwargs):
        #thr = threading.Thread(target = f, args = args, kwargs = kwargs)
        #thr.start()
        #t_num[0]+=1
        #if t_num[0]>=3:
            #thr.join()
    #return wrapper

def small(save_path, percentage=0.5):
    im = Image.open(save_path)  # 返回一个Image对象
    # os模块中的path目录下的getSize()方法获取文件大小，单位字节Byte
    start_size = os.path.getsize(save_path) / 1024
    size = start_size  # 计算图片大小即KB
    del start_size
    # size的两个参数
    width, height = im.size[0], im.size[1]
    # 用于保存压缩过程中的temp路径,每次压缩会被不断覆盖
    newPath = save_path
    while size > 1024:
        width, height = round(width * 0.7), round(height * 0.7)
        im = im.resize((width, height), Image.ANTIALIAS)
        im.save(newPath)
        size = os.path.getsize(newPath) / 1024
    # 压缩完成
    im.save(save_path)

def jpg_to_png(str):
    return str[0:str.rfind(".")]+".png"

def png_to_jpg(str):
    return str[0:str.rfind(".")]+".jpg"

def image_to_exten(str,exten):
    return str[0:str.rfind(".")]+"."+exten

def shui():
    while 1:
        if not q.empty() and t_num[0] == 0:
            add_text_to_image(q.get())
        else :
            time.sleep(0.5)

#@myasync
def add_text_to_image(start_path):
    try:
        if  os.path.exists(start_path):
            t_num[0] = 1
            text=u"予 复"
            image = Image.open(start_path)
            font = ft

            # 添加背景
            new_img = Image.new('RGBA', (image.size[0] * 3, image.size[1] * 3), (0, 0, 0, 0))
            new_img.paste(image, image.size)

            # 添加水印
            font_len = len(text)
            rgba_image = new_img.convert('RGBA')
            text_overlay = Image.new('RGBA', rgba_image.size, (255, 255, 255, 0))
            image_draw = ImageDraw.Draw(text_overlay)

            for i in range(0, rgba_image.size[0], font_len * 80 + 200):
                for j in range(0, rgba_image.size[1], 400):
                    image_draw.text((i, j), text, font=font, fill=(0, 0, 0, 50))
            del text,font_len
            text_overlay = text_overlay.rotate(-45)
            image_with_text = Image.alpha_composite(rgba_image, text_overlay)

            # 裁切图片
            image_with_text = image_with_text.crop((image.size[0], image.size[1], image.size[0] * 2, image.size[1] * 2))
            image_with_text.save(jpg_to_png(start_path))
            time.sleep(0.5)
            os.remove(start_path)
            small(jpg_to_png(start_path), 0.1)
            t_num[0]=0
    except:
        t_num[0] = 0


def uppath(path):
    q.put(path)

ti=threading.Thread(target=shui)
ti.start()

