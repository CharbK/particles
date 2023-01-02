m = document.getElementById("particles").getContext('2d')
draw = (x,y,c,s) => {
    m.fillStyle=c; m.fillRect(x, y, s, s)
}

particles=[]
particle = (x,y,c) => {
    return {
        "x": x, 
        "y": y, 
        "vx": 0, 
        "vy": 0, 
        "color": c
    }
}
    
random = () => {
    return Math.random()*800+50
}

create = (number, color) => { 
    
    group=[]
    for(let i=0; i < number; i++){
        group.push(particle(random(), random(), color))
        particles.push(group[i]) 
    }
    return group 
}

rule = (particles1, particles2, g) => {
    for(i=0; i < particles1.length; i++) {
        fx = 0
        fy = 0
        for(let j=0; j < particles2.length; j++) {
            a = particles1[i]
            b = particles2[j]
            dx = a.x-b.x
            dy = a.y-b.y
            d = Math.sqrt(dx*dx + dy*dy)
            if(d > 0 && d < 80) {
                F = g * 1/d
            fx += (F * dx)
            fy += (F * dy)
            }
        } 
        a.vx = (a.vx + fx)*0.5
        a.vy = (a.vy + fy)*0.5
        a.x += a.vx
        a.y += a.vy
        if(a.x <= 0 || a.x >= 1000) { 
            a.vx *=-1 
        }
        if(a.y <= 0 || a.y >= 1000) { 
            a.vy *=-1 
        }
    }
}

green = create(200, "green")
red = create(200, "red")
white = create(200, "white")
blue = create(200, "blue")

update = () => {

    rule(green, green, 1.65)
    rule(green, red, 1.2)
    rule(green, white, -1.65)
    rule(green, blue, 2.7)

    rule(red, red, -1.15)
    rule(red, green, 0.5)
    rule(red, white, 1.05)
    rule(red, blue, -2.2)
    
    rule(white, white, -1.7)
    rule(white, red, 1.45)
    rule(white, green, -4.8)
    rule(white, blue, 0.4)

    rule(blue, blue, -0.85)
    rule(blue, white, 1.6)
    rule(blue, red, -4.0)
    rule(blue, green, 0.25)


    m.clearRect(0, 0, 1000, 1000)
    draw(0, 0, "black", 1000)

    for(i=0; i<particles.length; i++) { 
        draw(particles[i].x, particles[i].y, particles[i].color, 5) 
    }

    requestAnimationFrame(update)
}

update();