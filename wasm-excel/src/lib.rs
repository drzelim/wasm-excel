use wasm_bindgen::prelude::wasm_bindgen;

pub mod file_io;
pub mod helpers;
pub mod models;

use crate::helpers::{get_report};

#[wasm_bindgen]
pub fn process_excel_file(data: Option<Vec<u8>>) -> Vec<u8>  {
    match data {
        Some(binary) => {
            get_report(binary)
        }
        _ => {
            Vec::new()
        }
    }
}
