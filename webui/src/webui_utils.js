import { exec } from 'kernelsu';

async function changeRGB(red_a, green_a, blue_a) {
  const red = red_a / 1000;
  const green = green_a / 1000;
  const blue = blue_a / 1000;
  await exec(`service call SurfaceFlinger 1015 i32 1 f ${red} f 0 f 0 f 0 f 0 f ${green} f 0 f 0 f 0 f 0 f ${blue} f 0 f 0 f 0 f 0 f 1`);
}

async function changeSaturation(sat_a) {
  const sat = sat_a / 2000;
  await exec(`service call SurfaceFlinger 1022 f ${sat}`);
}

async function resetColor() {
  await exec(`service call SurfaceFlinger 1015 i32 1 f 1 f 0 f 0 f 0 f 0 f 1 f 0 f 0 f 0 f 0 f 1 f 0 f 0 f 0 f 0 f 1`);
  await exec(`service call SurfaceFlinger 1022 f 1`);
}

document.addEventListener('DOMContentLoaded', async (event) => {
  const redSlider = document.getElementById('red');
  const greenSlider = document.getElementById('green');
  const blueSlider = document.getElementById('blue');
  const saturationSlider = document.getElementById('saturation');
  const resetButton = document.getElementById('reset-btn');

  const updateRGB = async () => {
    const redValue = redSlider.value;
    const greenValue = greenSlider.value;
    const blueValue = blueSlider.value;
    await changeRGB(redValue, greenValue, blueValue);
  };
  
  const updateSaturation = async () => {
    const saturationValue = saturationSlider.value;
    await changeSaturation(saturationValue);
  };

  // Listen for changes
  redSlider.addEventListener('input', updateRGB);
  greenSlider.addEventListener('input', updateRGB);
  blueSlider.addEventListener('input', updateRGB);
  saturationSlider.addEventListener('input', updateSaturation);

  // Reset button functionality
  resetButton.addEventListener('click', async () => {
    redSlider.value = 1000;
    greenSlider.value = 1000;
    blueSlider.value = 1000;
    saturationSlider.value = 1000;
    await resetColor();
  });
});
