# DCF77 Synchronizer

#### Demo available [here](http://einoko.github.io/DCF77-Synchronizer).

> #### ⚠️ Disclaimer
> __This script will produce a high-pitched 15.5kHz sine wave noise! Please protect your hearing! Also, it may or may not be legal to transmit this sound in your country. Consult your local laws if you are unsure.__

![IMG_1267](https://user-images.githubusercontent.com/36775736/231838065-4207139c-faaf-4d4e-84c8-bd898b90ca2e.jpg)

DCF77 Synchronizer is a web application that lets you simulate the [DCF77](https://en.wikipedia.org/wiki/DCF77) time signal in your browser. It's a modern successor to the [DCF77.js](https://github.com/einoko/DCF77.js) library I wrote earlier. The signal is simulated using the fifth harmonic of a 15.5 kHz signal.

Set your radio controlled clock/watch to “receive” mode and place it near the speaker or headphones. It should take a couple of minutes for your watch to synchronize.

### Signal documentation
* [https://en.wikipedia.org/wiki/DCF77](https://en.wikipedia.org/wiki/DCF77)

## Instructions

1. Click "START TRANSMISSION". Do not start the transmission at full volume! Increase the volume gradually, to the point where you can hear the signal clearly.
2. Set your radio controlled watch or clock to "receive" mode and place its antenna near the speaker or headphones (~1–5 cm)
3. Wait. It can take anywhere from 2 to 10 minutes for your watch to synchronize.

### What if it doesn't work?
It's most likely one of these reasons:

1. __The speaker volume is not loud enough:__ Try increasing the volume of the transmission.
2. __The antenna is not placed near enough to the speaker:__ Try placing it closer to the speaker.

If it's still not working, your clock/watch probably cannot be fooled by this signal. The signal was tested on my Casio Wave Ceptor wristwatch and a radio controlled wall clock.
