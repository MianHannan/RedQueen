import React from 'react';
import useWebAnimations from '@wellyshen/use-web-animations'

//Styles
import './styles/Queen.css'
import './styles/App.css'

function App() {

  //Variables

  var sceneryFrames = [
    { transform: 'translateX(100%)' },
    { transform: 'translateX(-100%)' }
  ];

  var sceneryTimingBackground = {
    duration: 36000,
    iterations: Infinity
  };

  var sceneryTimingForeground = {
    duration: 12000,
    iterations: Infinity
  };

  //Backgrounds

  const background1 = useWebAnimations({
    keyframes: sceneryFrames,
    timing: sceneryTimingBackground
  })

  const background2 = useWebAnimations({
    keyframes: sceneryFrames,
    timing: sceneryTimingBackground
  })

  //Foregrounds

  const foreground1 = useWebAnimations({
    keyframes: sceneryFrames,
    timing: sceneryTimingForeground
  })

  const foreground2 = useWebAnimations({
    keyframes: sceneryFrames,
    timing: sceneryTimingForeground
  })

  var spriteFrames = [
    { transform: 'translateY(0)' },
    { transform: 'translateY(-100%)' }
  ];

  //Queen and alice Movement
  const sprite = useWebAnimations({
    keyframes: spriteFrames,
    timing: {
      easing: 'steps(7, end)',
      direction: "reverse",
      duration: 600,
      playbackRate: 1,
      iterations: Infinity
    }
  });

  //Code to run OnLoad
  React.useEffect(() => {

    var background1Movement = background1.getAnimation();
    var background2Movement = background2.getAnimation();
    var foreground1Movement = foreground1.getAnimation();
    var foreground2Movement = foreground2.getAnimation();
    var redQueen_alice = sprite.getAnimation();

    var scene = [foreground1Movement, foreground2Movement, background1Movement, background2Movement];

    function goFaster() {
      if (redQueen_alice.playbackRate < 50) {
        redQueen_alice.playbackRate += .1;
        scene.map(item => item.playbackRate += .1);
      }
    }

    function slowDown() {
      if (foreground1Movement.playbackRate > -2) {
        if (redQueen_alice.playbackRate > .6) { redQueen_alice.playbackRate -= .1 }
        scene.map(item => item.playbackRate -= .1);
        console.log(foreground1Movement.playbackRate + " " + " " + redQueen_alice.playbackRate);
      }

    }

    //Adjust Scene timing
    background1Movement.currentTime = background1Movement.effect.getTiming().duration / 2;
    foreground1Movement.currentTime = foreground1Movement.effect.getTiming().duration / 2;

    //SpeedUp on Click and Tap
    document.addEventListener("click", goFaster);
    document.addEventListener("touchstart", goFaster);

    //SpeedDown every second
    setInterval(slowDown, 3000);
  })

  return (
    <div className="wrapper" >
      <div className="sky" ></div>
      <div className="earth">
        <div id="red-queen_and_alice">
          <img id="red-queen_and_alice_sprite" ref={sprite.ref} src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/sprite_running-alice-queen_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/sprite_running-alice-queen.png 2x" alt="Alice and the Red Queen running to stay in place." />
        </div>
      </div>

      <div className="scenery" id="foreground1" ref={foreground1.ref}>
        <img id="palm3" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm3_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm3.png 2x" alt=" " />
      </div>
      <div className="scenery" id="foreground2" ref={foreground2.ref}>
        <img id="bush" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/bush_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/bush.png 2x" alt=" " />
        <img id="w_rook_upright" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook_upright_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook_upright.png 2x" alt=" " />
      </div>
      <div className="scenery" id="background1" ref={background1.ref}>
        <img id="r_pawn_upright" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn_upright_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn_upright.png 2x" alt=" " />
        <img id="w_rook" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook.png 2x" alt=" " />
        <img id="palm1" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm1_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm1.png 2x" alt=" " />
      </div>
      <div className="scenery" id="background2" ref={background2.ref}>
        <img id="r_pawn" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn.png 2x" alt=" " />
        <img id="r_knight" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_knight_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_knight.png 2x" alt=" " />
        <img id="palm2" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm2_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm2.png 2x" alt=" " />
      </div>
    </div>
  )
}

export default App;
