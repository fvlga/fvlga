import onnxruntime as ort, numpy as np, subprocess, json
from PIL import Image
S='/tmp/claude-0/-home-user-fvlga/f42938d8-1da3-5da3-94b6-13fe2d019814/scratchpad'
sess=ort.InferenceSession(S+'/segdl/model/u2net_human_seg.onnx',providers=['CPUExecutionProvider']); inp=sess.get_inputs()[0].name
mean=np.array([0.485,0.456,0.406]);std=np.array([0.229,0.224,0.225])
raw=subprocess.run(['ffmpeg','-nostdin','-v','error','-i','/home/user/fvlga/fvlga-visualizer/cuff_no_dancer_visualizer_v35.mp4','-vf','fps=4,crop=1080:608:0:656,scale=320:320','-f','rawvideo','-pix_fmt','rgb24','-'],capture_output=True).stdout
n=len(raw)//(320*320*3); fr=np.frombuffer(raw,np.uint8)[:n*320*320*3].reshape(n,320,320,3); out=[]
for i in range(n):
    x=((fr[i]/255.-mean)/std).transpose(2,0,1)[None].astype(np.float32)
    o=sess.run(None,{inp:x})[0][0,0]; o=(o-o.min())/(o.max()-o.min()+1e-8); m=o>0.55
    if m.sum()<400: out.append(None); continue
    ys,xs=np.where(m); y0,y1,x0,x1=ys.min(),ys.max()+1,xs.min(),xs.max()+1
    # head zone = top 42% of the person box (whole box if it is a close-up filling the frame)
    hy1=y0+(y1-y0)*(1.0 if (y1-y0)>0.8*320 else 0.42)
    out.append([round(x0*1080/320),round(y0*608/320),round(x1*1080/320),round(hy1*608/320)])
json.dump({'fps':4,'t0':0,'boxes':out},open(S+'/faces.json','w')); print(n,sum(o is not None for o in out))
