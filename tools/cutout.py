import truststore
truststore.inject_into_ssl()  # usa o cofre de certificados do Windows (corrige SSL)

from rembg import remove, new_session
from PIL import Image

src = "public/gustavo.jpg"
dst = "public/gustavo-cutout.png"

img = Image.open(src).convert("RGBA")
# modelo voltado para silhueta humana
session = new_session("u2net_human_seg")
out = remove(
    img,
    session=session,
    alpha_matting=True,
    alpha_matting_foreground_threshold=240,
    alpha_matting_background_threshold=10,
    alpha_matting_erode_size=10,
)
out.save(dst)
print("OK", dst, out.size)
