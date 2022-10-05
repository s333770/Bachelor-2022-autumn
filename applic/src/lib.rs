use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct Bird{
    x: i32, 
    y: i32, 
    velocity: i32
}

impl Bird{
    fn new()->Bird{
        Bird{
            x: 300,
            y: 200,
            velocity: 1
        }
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
  
}
