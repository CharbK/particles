import random

import pygame

particules=[]
window_size = 300
pygame.init()
window = pygame.display.set_mode((window_size, window_size))



def draw(surface, x, y, color, size):
    for i in range(0, size):
        pygame.draw.line(surface, color, (x, y-1), (x, y+2), abs(size))
               
def particule(x, y, c):
    return {"x": x, "y": y, "vx": 0, "vy": 0, "color": c}

def randomxy():
    return round(random.random()*window_size + 1)

def create(number, color):
    group = []
    for i in range(number):
        group.append(particule(randomxy(), randomxy(), color))
        particules.append((group[i]))
    return group

def rule(particules1, particules2, g):
    for i in range(len(particules1)):
        fx = 0
        fy = 0
        for j in range(len(particules2)):
            a = particules1[i]
            b = particules2[j]
            dx = a["x"] - b["x"]
            dy = a["y"] - b["y"]
            d = (dx*dx + dy*dy)**0.5
            if( d > 0 and d < 80):
                F = g/d
                fx += F*dx
                fy += F*dy
        a["vx"] = (a["vx"] + fx)*0.5
        a["vy"] = (a["vy"] + fy)*0.5
        a["x"] += a["vx"]
        a["y"] += a["vy"]
        if(a["x"] <= 0 or a["x"] >= window_size):
            a["vx"] *=-1
        if(a["y"] <= 0 or a["y"] >= window_size):
            a["vy"] *=-1        


yellow = create(window_size // 3, "yellow")
red = create(window_size // 3, "red")
blue = create(window_size // 3, "blue")
white = create(window_size // 3, "white")

run = True
while run:
    window.fill(0)

    rule(red, red, random.uniform(-1,1))
    rule(red, yellow, random.uniform(-1,1))
    rule(red, blue, random.uniform(-1,1))
    rule(red, white, random.uniform(-1,1))

    rule(yellow, yellow, random.uniform(-1,1))
    rule(yellow, red, random.uniform(-1,1))
    rule(yellow, blue, random.uniform(-1,1))
    rule(yellow, white, random.uniform(-1,1))

    rule(blue, yellow, random.uniform(-1,1))
    rule(blue, red, random.uniform(-1,1))
    rule(blue, blue, random.uniform(-1,1))
    rule(blue, white, random.uniform(-1,1))

    rule(white, yellow, random.uniform(-1,1))
    rule(white, red, random.uniform(-1,1))
    rule(white, blue, random.uniform(-1,1))
    rule(white, white, random.uniform(-1,1))

    for i in range(len(particules)):
        draw(window,  particules[i]["x"], particules[i]["y"], particules[i]["color"], 3)
        
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            run = False
    pygame.display.flip()
pygame.quit()
exit()
