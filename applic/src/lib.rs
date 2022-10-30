use std::time::{Duration, SystemTime};
use wasm_bindgen::prelude::*;

const WORLD_WIDTH: usize = 400;
const WORLD_HEIGHT: usize = 400;

#[wasm_bindgen(module = "/www/utils/date.js")]
extern "C" {
    fn now() -> usize;
}

#[wasm_bindgen]
pub struct Bird {
    x: i32,
    y: f32,
    size: i32,
    velocity: i32,
}

#[wasm_bindgen]
pub struct Pipe {
    x: usize,
    width: i32,
    top: i32,
    bottom: i32,
    pipe_spawn_rate: i32,
}

impl Pipe {
    fn new() -> Pipe {
        Pipe {
            x: WORLD_WIDTH,
            width: 30,
            top: 30,
            bottom: 30,
            pipe_spawn_rate: 0,
        }
    }
}

impl Bird {
    fn new() -> Bird {
        Bird {
            x: 200,
            y: 300.1,
            size: 15,
            velocity: -1,
        }
    }
}

#[wasm_bindgen]
pub struct Game {
    height: i32,
    width: i32,
    bird: Bird,
    pipe: Pipe,
}

#[wasm_bindgen]
impl Game {
    pub fn new() -> Game {
        Game {
            height: 400,
            width: 400,
            bird: Bird::new(),
            pipe: Pipe::new(),
        }
    }
    pub fn width(&self) -> i32 {
        self.width
    }
    pub fn height(&self) -> i32 {
        self.height
    }
    pub fn bird_x(&self) -> i32 {
        self.bird.x
    }
    pub fn bird_y(&self) -> f32 {
        self.bird.y
    }
    pub fn bird_velocity(&self) -> i32 {
        self.bird.velocity
    }
    pub fn bird_size(&self) -> i32 {
        self.bird.size
    }
    pub fn fly_upwards(&mut self) {
        self.bird.y = self.bird.y - 30.0;
    }
    pub fn gravity(&mut self) {
        self.bird.y = self.bird.y + 0.5;
        if self.bird.y > self.height as f32 {
            self.bird.y = self.height as f32;
        }
    }
    pub fn get_current_counter(&self) -> i32 {
        return self.pipe.pipe_spawn_rate;
    }
    pub fn update_spawn_rate(&mut self) {
        self.pipe.pipe_spawn_rate = self.pipe.pipe_spawn_rate + 1;
        if self.pipe.pipe_spawn_rate > 100 {
            self.pipe.pipe_spawn_rate = 0;
        }
    }
    pub fn get_random_number(&mut self) -> usize {
        let pipeGenerator = now() % WORLD_WIDTH;

        return pipeGenerator;
    }
}

fn get_random_buf() -> Result<[u8; 1], getrandom::Error> {
    let mut buf = [1];
    getrandom::getrandom(&mut buf)?;
    return Ok(buf);
}
