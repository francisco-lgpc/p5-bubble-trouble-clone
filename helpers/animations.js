function triggerExplosion() {
	explosions.push({ frame: 16, pos: player.pos.copy() })
	for (var i = balls.length - 1; i >= 0; i--) {
		if(balls[i].pos.dist(player.pos) < balls[i].r + 150) {
			balls[i]
			balls[i].split();
			balls.splice(i, 1);
		}
	}
}

function explosionAnimation() {
	for (var i = explosions.length - 1; i >= 0; i--) {
		if (explosions[i].frame > 0) {
			image(explosion[explosions[i].frame], explosions[i].pos.x, explosions[i].pos.y, 400, 400);

			if (frameCount % 3 === 0 || explosions[i].frame > 6) {
				explosions[i].frame--;
			}
		} else {
			explosions.splice(i, 1);
		}
	}
}

function playerShootingAnimation() {
	if(player.shooting) {
		if(countShootingFrames > 5) {
			player.shooting = false;
		}
		countShootingFrames++;
	}
}
