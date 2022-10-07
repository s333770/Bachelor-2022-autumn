use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct Bird{
    x: i32, 
    y: i32, 
    size: i32,
    velocity: i32
}

impl Bird{
    fn new()->Bird{
        Bird{
            x: 200,
            y: 300,
            size: 15,
            velocity: -1
        }
    }
    pub fn update(&mut self){
        self.y=1;
    }
}



#[wasm_bindgen]
pub struct Game{
     height: i32, 
    width: i32,
     bird: Bird
}


#[wasm_bindgen]
impl Game{
    pub fn new()->Game{
        Game{
            height: 600, 
            width: 400,
            bird: Bird::new()
        }
        

    }
    pub fn width(&self)->i32{
        self.width
    }
    pub fn height(&self)->i32{
        self.height
    }
    pub fn bird_x(&self)->i32{
        self.bird.x
    }
    pub fn bird_y(&self)->i32{
        self.bird.y
    }
    pub fn bird_velocity(&self)->i32{
        self.bird.velocity
    }
    pub fn bird_size(&self)->i32{
        self.bird.size
    }
  
}
