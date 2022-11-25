use wasm_bindgen::prelude::*;

const WORLD_WIDTH: usize = 600;
const WORLD_HEIGHT: usize = 400;

#[wasm_bindgen(module = "/www/utils/date.js")]
extern "C" {
    fn now() -> usize;
}
#[wasm_bindgen(module = "/www/utils/random.js")]
extern "C" {
    fn random() -> f64;
}

#[wasm_bindgen]
pub struct Bird {
    x: usize,
    y: f32,
    size: i32,
    velocity: i32,
}

#[wasm_bindgen]
pub struct Pipe {
    width: usize,
    top: usize,
    bottom: usize,
    pipe_spawn_rate: usize,
}

fn print_current_time() -> usize {
    let mut rng = get_random_buf();
    let value2 = rng.unwrap()[0];
    let mut modulus: u16 = value2 as u16 * 1000;
    let return_value = modulus % 600;

    return return_value as usize;
}

fn get_random_buf() -> Result<[u8; 1], getrandom::Error> {
    let mut buf = [1];
    getrandom::getrandom(&mut buf)?;
    Ok(buf)
}

impl Pipe {
    fn new() -> Pipe {
        Pipe {
            width: 100,
            top: print_current_time() / 3,
            bottom: print_current_time() / 3,
            pipe_spawn_rate: WORLD_WIDTH,
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
    pipe2: Pipe,
    game_over: bool,
    game_counter: i32,
}

#[wasm_bindgen]
impl Game {
    pub fn new() -> Game {
        Game {
            height: 400,
            width: 400,
            bird: Bird::new(),
            pipe: Pipe::new(),
            pipe2: Pipe::new(),
            game_over: false,
            game_counter: 0,
        }
    }
    pub fn width(&self) -> i32 {
        self.width
    }
    pub fn height(&self) -> i32 {
        self.height
    }
    pub fn bird_x(&self) -> usize {
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

    pub fn get_pipe_top(&mut self) -> usize {
        return self.pipe.top;
    }
    pub fn get_pipe_bottom(&mut self) -> usize {
        return self.pipe.bottom;
    }
    pub fn get_pipe_width(&mut self) -> usize {
        return self.pipe.width;
    }
    pub fn get_pipe2_top(&mut self) -> usize {
        return self.pipe2.top;
    }
    pub fn get_pipe2_width(&mut self) -> usize {
        return self.pipe2.top;
    }
    pub fn get_pipe2_bottom(&mut self) -> usize {
        return self.pipe2.bottom;
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
    pub fn get_current_counter(&self) -> usize {
        return self.pipe.pipe_spawn_rate;
    }
    pub fn update_spawn_rate(&mut self) {
        if (self.game_over) {
            self.pipe.pipe_spawn_rate = 0;
        }
        self.pipe.pipe_spawn_rate = self.pipe.pipe_spawn_rate - 1;
        if self.pipe.pipe_spawn_rate <= 0 {
            self.pipe.pipe_spawn_rate = WORLD_WIDTH;
            self.pipe = Pipe::new();
            self.pipe2 = Pipe::new();
        }
    }
    pub fn get_random_number(&mut self) -> usize {
        let pipe_generator = now() % WORLD_WIDTH;
        return pipe_generator;
    }

    pub fn detect_collsion(&mut self) -> bool {
        if self.bird_x() as usize > (self.get_current_counter() - self.get_pipe_width()) {
            if self.bird_y() < self.get_pipe_top() as f32 {
                self.game_over = true;
            }
            if self.bird_y() > (WORLD_HEIGHT - self.get_pipe2_bottom()) as f32 {
                self.game_over = true;
            }
            return false;
        }
        return false;
    }
    pub fn get_current_time(&mut self) -> usize {
        return now();
    }
    pub fn get_game_state(&mut self) -> bool {
        return self.game_over;
    }
    pub fn reset_game_state(&mut self) {
        self.game_over = false;
        self.pipe.pipe_spawn_rate = WORLD_WIDTH;
    }
}
