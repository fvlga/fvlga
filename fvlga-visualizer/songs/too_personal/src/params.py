import json
S='/tmp/claude-0/-home-user-fvlga/f42938d8-1da3-5da3-94b6-13fe2d019814/scratchpad'
DUR=117.86; T0=0.825; BEAT=0.923; BAR=3.692; DROP=13.75
def bar(k): return round(2.674+BAR*k,3)
# shots: (start, clip, focus_x, focus_y, zoom_dir)  -- end = next start
SHOTS=[(0,14,.5,.55,1),(6.366,11,.5,.55,1),(13.75,16,.5,.5,1),(17.442,21,.5,.5,1),(21.134,10,.5,.5,-1),(24.826,36,.5,.5,1),
 (28.518,37,.5,.45,1),(32.21,12,.5,.5,-1),(35.902,1,.5,.5,1),(39.594,80,.5,.5,1),(43.286,13,.5,.45,1),(46.978,38,.5,.5,-1),
 (50.67,54,.5,.55,1),(61.75,49,.5,.5,1),
 (72.83,25,.5,.5,1),(76.522,17,.5,.5,1),(80.214,78,.5,.5,-1),(83.906,79,.5,.5,1),(87.598,22,.5,.5,1),(91.29,19,.5,.5,-1),
 (94.98,48,.5,.5,1),(98.67,90,.5,.5,1),(102.36,14,.5,.55,-1)]
CAPS=[(14.57,"the times have changed, the times is different"),(16.52,"i'm finna buy me a diamond pendant"),(18.31,"i'm finna buy you a diamond necklace"),
(20.13,"i can't be trusting these hoes, i'm too reckless"),(22.13,"the times have changed, the times is different"),(24.77,"yeah, yeah, the times have changed, the times is different",27.7),
(27.83,"yeah, yeah, okay",28.7),(28.78,"i was down bad, now my money stand up"),(31.02,"you blocked all my numbers, i can't even call you"),(33.06,"hundred racks, this how my money count up"),
(34.45,"i don't need no new bitch, i only just want you",36.5),(36.72,"the times have changed, the times is different"),(38.78,"yeah, yeah, the times have changed, the times is different",42.4),
(42.52,"yeah, yeah, okay",43.7),(43.9,"the times have changed, so i gotta keep on going",46.3),(46.39,"yes, i gotta keep on moving"),
(48.57,"'cause i don't wanna put myself in the middle of all your bullshit"),(52.45,"maybe one day in a perfect world we could stop fighting and be cool again"),
(56.12,"but i don't think it could happen, girl, 'cause i think you're too stupid"),(59.79,"but i can't let go, i can't let go"),(62.17,"i think i should open up more"),
(63.87,"but i still gotta do all my shows"),(65.91,"i still gotta stay on the road"),(68.02,"but i don't think we could fix it, though"),(69.99,"we gotta pull up professional"),
(71.69,"the shit that we had is too personal"),(73.65,"the times have changed, the times is different"),(75.56,"i'm finna buy me a diamond pendant"),(77.40,"i'm finna buy you a diamond necklace"),
(79.24,"i can't be trusting these hoes, i'm too reckless"),(81.07,"the times have changed, the times is different"),(83.86,"yeah, yeah, the times have changed, the times is different",86.7),
(87.12,"yeah, yeah, okay",88.3),(88.48,"i was down bad, now my money stand up"),(90.12,"you blocked all my numbers, i can't even call you"),(92.16,"hundred racks, this how my money count up"),
(93.72,"i don't need no new bitch, i only just want you",95.7),(95.80,"the times have changed, the times is different"),(97.73,"yeah, yeah, the times have changed, the times is different",101.9)]
caps=[]
for i,c in enumerate(CAPS):
    s=c[0]; e=c[2] if len(c)>2 else min((CAPS[i+1][0]-0.06) if i+1<len(CAPS) else 102, s+4.2)
    caps.append([s,round(e,2),c[1]])
QUOTES=[(15.6,19.6,"the miles do their work while we are asleep",0),(26.0,30.0,"a letter takes longer than a heart does to change",1),
(37.2,41.4,"we measured the distance in how long the phone rang",2),(44.4,48.4,"time is the kindest liar there is",0),
(52.9,57.6,"what you keep is only what you did not say",1),(63.4,68.0,"i would have waited if you had said how long",2),
(80.6,84.6,"you can lose a person by being polite",1),(98.9,103.2,"somewhere a light is still on for no one",2),(103.6,107.6,"the road does not care who is on it",0)]
TIMELINES=[(14.57,16.4),(22.13,24.7),(24.77,27.7),(36.72,38.7),(38.78,42.4),(43.9,46.3),(73.65,75.5),(81.07,83.0),(83.86,86.6),(95.8,97.7),(97.73,101.9)]
HOOKS=[(13.75,28.518),(35.902,43.286),(72.83,87.598),(94.98,102.36)]
STICK=[(13.75,28.518,'BR'),(28.518,43.286,'BL'),(72.83,87.598,'BR'),(87.598,102.36,'BL')]
DIAMOND=[(17.55,0),(19.5,1),(76.6,0),(78.5,1)]
BLOCK=[(31.02,33.0),(90.12,92.1)]
GOLD=[35.2,94.65]
FACES=[(58.0,61.8,'f1',1),(64.2,67.8,'f2',0)]
json.dump(dict(DUR=DUR,T0=T0,BEAT=BEAT,BAR=BAR,DROP=DROP,CAPS=caps,QUOTES=QUOTES,TIMELINES=TIMELINES,HOOKS=HOOKS,STICK=STICK,DIAMOND=DIAMOND,BLOCK=BLOCK,GOLD=GOLD,FACES=FACES),open(S+'/tp/params.json','w'))
