from PIL import Image, ImageOps, ImageDraw, ImageFilter
import numpy as np, math
S='/tmp/claude-0/-home-user-fvlga/f42938d8-1da3-5da3-94b6-13fe2d019814/scratchpad'
def halftone(src, box, out, W=300, H=360, cell=5.0, ink=(12,26,30)):
    im=Image.open(src).convert('L').crop(box).resize((W,H),Image.LANCZOS)
    im=ImageOps.autocontrast(im,cutoff=2); a=np.asarray(im).astype(float)/255
    a=1-np.clip(a**0.85*1.1,0,1)
    # edge fade mask
    yy,xx=np.mgrid[0:H,0:W]; m=np.minimum.reduce([xx/ (W*0.18),(W-1-xx)/(W*0.18),yy/(H*0.14),(H-1-yy)/(H*0.14)]); m=np.clip(m,0,1)
    S2=3; pm=(np.clip(m*1.6,0,1)*215).astype(np.uint8); paper=np.zeros((H,W,4),np.uint8); paper[...,0]=232;paper[...,1]=238;paper[...,2]=230;paper[...,3]=pm
    big=Image.fromarray(paper).resize((W*S2,H*S2),Image.LANCZOS); d=ImageDraw.Draw(big)
    c,s=math.cos(math.pi/4),math.sin(math.pi/4)
    n=int(max(W,H)*1.5/cell)
    for j in range(-n,n):
        for i in range(-n,n):
            u,v=i*cell,j*cell
            x=u*c-v*s+W/2; y=u*s+v*c+H/2
            if x<0 or y<0 or x>=W or y>=H: continue
            l=a[int(y),int(x)]
            r=cell*0.66*math.sqrt(l)
            if r<0.4: continue
            d.ellipse([(x-r)*S2,(y-r)*S2,(x+r)*S2,(y+r)*S2],fill=ink+(255,))
    big=big.resize((W,H),Image.LANCZOS); big.save(out)
halftone(S+'/clips/E/0113.jpg',(60,160,560,760),S+'/tp/faces/f1.png')
halftone(S+'/clips/D/0076.jpg',(190,170,690,770),S+'/tp/faces/f2.png')
