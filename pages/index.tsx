import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import * as BABYLON from 'babylonjs';
import React, { useEffect } from 'react';
import { Html } from 'next/document';
import * as GUI from 'babylonjs-gui';
import { Mesh } from 'babylonjs';

const Home: NextPage = () => {
  useEffect(() => {
    // Get the canvas DOM element
    const canvas = document.getElementById('renderCanvas') as HTMLCanvasElement;
    const engine = new BABYLON.Engine(canvas, true, {preserveDrawingBuffer: true, stencil: true});

    canvas.onclick = function (e) {
        const left = (e.clientX - e.offsetX / 2);
        const top = (e.clientY - e.offsetY / 2);
        createMarker(top, left);
    }

    const createMarker = function (left, top){
        let guiCanvas = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
        let guiButton = GUI.Button.CreateSimpleButton('marker', 'i');
        guiButton.width = '50px';
        guiButton.height = '50px';
        guiButton.color = 'white';
        guiButton.cornerRadius = 50;
        guiButton.background = '#333';
        guiButton.left = left
        guiButton.top = top
        guiCanvas.addControl(guiButton); 
    } 

    var createScene0 = function () {
        
        const scene0 = new BABYLON.Scene(engine);
        const camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2,  Math.PI / 2, 5, BABYLON.Vector3.Zero(), scene0);
        camera.attachControl(canvas, true);
        camera.inputs.attached.mousewheel.detachControl();

        const dome = new BABYLON.PhotoDome(
          "testdome",
          "/360.jpeg",
          {
              resolution: 32,
              size: 1000
          },
          scene0
        )

        return scene0;
    }
    
    var createScene1 = function () {
      const scene1 = new BABYLON.Scene(engine);
      const camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2,  Math.PI / 2, 5, BABYLON.Vector3.Zero(), scene1);
      camera.attachControl(canvas, true);
      camera.inputs.attached.mousewheel.detachControl();

      const dome = new BABYLON.PhotoDome(
        "testdome2",
        "/360-room.jpeg",
        {
            resolution: 32,
            size: 1000
        },
        scene1
      )
        return scene1;
    }
    
    //Any other code
    var scene0 = createScene0();
    var scene1 = createScene1();
    
    engine.runRenderLoop(function () {
      scene0.render();
      scene1.render();
    });

    document.onkeydown = function (e) {
      e = e || window.event
      switch (e.key) {
        case "ArrowLeft":
            // show prev scene
            scene1.dispose();
            scene1.render();
            scene0.render();
            break;
        case "ArrowRight":
            // show next scene
            scene0.dispose();
            scene0.render();
            scene1.render();
            break;
      }
    }

  })

  return (
      <div className={styles.container}>
        <Head>
          <title>Babylon</title>
          <meta name="description" content="Babylon" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
            <canvas className={styles.canvas} id="renderCanvas"> 
            </canvas>
        </main>

      </div>
  )
}

export default Home
