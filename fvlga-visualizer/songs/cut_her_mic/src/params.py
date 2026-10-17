import json
S='/tmp/claude-0/-home-user-fvlga/f42938d8-1da3-5da3-94b6-13fe2d019814/scratchpad'
DUR=89.42; T0=3.402; BEAT=60/69.84; HALF=2*BEAT
HOOK1=13.71; V1=30.89; SH=41.20; V2=44.64; HOOK2=68.69; OUTRO=82.44
# explicit cut plan in beat units (0 = first beat at T0): (start_beat, end_beat, step_beats)
PLAN=[(0,8,8),(8,12,1),(12,20,2),(20,26,1),(26,32,2),(32,44,2),(44,48,2),(48,52,2),(52,56,1),(56,60,2),(60,64,4),(64,68,4),(68,76,2),(76,92,2)]
CLIPS=[84, 74,70,75,71, 65,82,66,69, 68,81,86,89,77,71, 63,72,83, 88,87,85,62,67,61, 64,90, 2,7, 36,37,38,34, 59,15, 10, 73, 35,39,13,12, 37,5,4,14,48,11,31,58]
cuts=[]
for a,b,st in PLAN:
    k=a
    while k<b: cuts.append(round(T0+k*BEAT,3)); k+=st
assert len(cuts)==len(CLIPS),(len(cuts),len(CLIPS))
SHOTS=[(cuts[i],CLIPS[i]) for i in range(len(CLIPS))]+[(OUTRO,0)]
L=lambda s,t,x,end=None:[s,end,x]
RAW=[(0.8,"i got racks in the air, throwing up all ones",2.9),(3.3,"i got racks in the air, throwing up all ones",4.9),(5.0,"i got racks in the air, throwing up all ones",8.4),
(8.7,"i got racks in the air, throwing up all ones",10.1),(10.2,"i got racks in the air, throwing up all ones",11.8),(11.9,"i got racks in the air, throwing up all ones",13.4),
(13.5,"shawty made me have so much fun like thugger",15.7),(15.8,"so much fun like thugger",17.2),(17.3,"i look in her eyes, you know that i want her",19.1),
(19.2,"we might just be made for each other",20.3),(20.4,"i don't really know how long we'll last",22.4),(22.5,"but this might be for the summer",24.2),
(24.3,"chrome heart jeans, designer pants, size 32 for the summer",27.1),(27.2,"chrome heart jeans, designer pants, size 32 for the waist",30.3),
(31.3,"i got a glock on my waist",32.4),(32.5,"choppa gon' eat up your face",34.0),(34.6,"those niggas gon' slime you today",35.7),(35.8,"they'll do you the worst way",37.4),
(37.5,"so slime all those niggas today",39.4),(39.5,"so slime all those niggas today",40.8),(40.9,"shawty made me have so much fun like thugger",43.1),(43.2,"so much fun like thugger",44.2),
(44.3,"yeah, she bad, she built like summer walker",46.5),(46.6,"built like summer walker",47.6),(47.7,"she wasn't on that, so i had to cut her",50.1),(50.2,"i had to cut her",51.3),
(51.4,"that ass so fat like",53.4),(53.5,"that ass so fat like butter",54.9),(55.0,"i jump in that cat like what",56.4),(56.5,"i jump in that cat, make it water",58.2),
(58.3,"she keep on letting me inside her ocean",60.2),(60.3,"i'm bout to dive in like otter",61.3),(61.4,"i came in this bitch, yeah, i'm flexing inside the gle",63.6),
(63.7,"got a hundred of those",65.0),(65.1,"the number 9 jeans too tight, like fuck it",66.6),(66.7,"i might just go back to my size 34",68.1),
(68.2,"shawty made me have so much fun like thugger",70.4),(70.5,"so much fun like thugger",71.7),(71.8,"i look in her eyes, you know that i want her",73.9),(74.0,"we might just be made for each other",75.0),
(75.1,"i don't really know how long we'll last",77.3),(77.4,"but this might be for the summer",78.9),(79.0,"chrome heart jeans, designer pants, size 32 for the summer",82.3)]
CAPS=[[a,e,t] for a,t,e in RAW]
# giant words: (t, text, hold, x_frac, y_frac, rot)
WORDS=[(15.15,"THUGGER",1.5,.5,.5,-3),(23.35,"SUMMER",1.7,.5,.45,2),(25.3,"32",1.1,.5,.5,-4),(31.5,"GLOCK",1.0,.5,.5,2),(35.0,"SLIME",1.2,.5,.5,-2),(38.3,"SLIME",1.4,.5,.5,3),
(42.6,"THUGGER",1.2,.5,.5,-2),(45.6,"SUMMER WALKER",1.8,.5,.5,2),(54.2,"BUTTER",1.0,.5,.5,-3),(57.2,"WATER",1.1,.5,.5,2),(60.9,"OTTER",1.0,.5,.5,-2),(62.9,"GLE",1.1,.5,.5,3),
(67.6,"34",1.0,.5,.5,-3),(69.9,"THUGGER",1.4,.5,.5,2),(78.0,"SUMMER",1.9,.5,.45,-2),(80.9,"32",1.4,.5,.5,3)]
STAMPS=[49.55,50.9]
GLITCH=[(49.5,50.05),(50.85,51.4)]
QUOTES=[(18.2,22.0,"the summer keeps its own count",0),(31.6,34.7,"everything good is rented",0),(44.9,48.7,"swim while the water is warm",0),(66.3,68.5,"enjoy it like it is borrowed",0),(27.9,31.0,"the first warm day is a promise with a date on it",0),(83.2,88.2,"the sun is always already leaving",2)]
POPS=[]
ONES=[0.8,3.3,5.0,8.7,10.2,11.9]
BANDS=[ # (a, b, word, tint)
 (8.7,10.1,'racks in the air','w'),(10.2,11.8,'racks in the air','w'),(11.9,13.5,'racks in the air','w'),
 (22.5,24.3,'for the summer','w'),(77.4,79.2,'for the summer','w'),
 (34.6,40.8,'slime','g'),(56.5,58.3,'water','t'),(58.3,60.3,'ocean','t')]
FACES=[(17.3,20.2,'f1',0),(46.0,48.4,'f2',1),(71.8,74.6,'f2',0)]
STICK=[(13.71,30.89,'BR'),(30.89,44.64,'BL'),(44.64,68.69,'BR'),(68.69,82.44,'BL')]
json.dump(dict(DUR=DUR,T0=T0,BEAT=BEAT,HOOK1=HOOK1,OUTRO=OUTRO,CAPS=CAPS,WORDS=WORDS,STAMPS=STAMPS,QUOTES=QUOTES,POPS=POPS,ONES=ONES,BANDS=BANDS,FACES=FACES,STICK=STICK),open(S+'/cm/params.json','w'))
