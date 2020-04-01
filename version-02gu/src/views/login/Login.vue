<template>
<div>
    <div id="canvascontainer" ref="can"></div>
    <div class="firstdemo">
        <el-form ref="form" :model="form" label-width="80px">
        <el-row type="flex" justify="center">
        <el-col :span="5">
        <el-form-item label="用户名">
        <el-input v-model="form.name"></el-input>
        </el-form-item>
        </el-col>
        </el-row>
        <el-row type="flex" justify="center">
        <el-col :span="5">
        <el-form-item label="密码">
        <el-input v-model="form.password"></el-input>
        </el-form-item>
        </el-col>
        </el-row>
        
        <el-row type="flex" justify="center">
        <el-col :span="5">
        <el-form-item>
        <el-button type="primary" @click="onSubmit">登陆</el-button>
        </el-form-item>
        </el-col>
        </el-row>
        </el-form>
    </div>
</div>
</template>
<script>
import * as THREE from 'three'
// import * as THREE from '../../assets/js/three.min.js';
// const THREE = require('../../assets/js/three.min.js')
export default {
    name: "fisrtdemo",
    data() {
        return {
            form: { name: "",password: ""},
            token: localStorage.getItem('Authorization')
        };
    },
    methods: {
        onSubmit() {
            if (this.form.name == "admin" && this.form.password == "111111") {
                this.$message({
                    message: '登陆成功',
                    type: 'success'
                }); 
                localStorage.setItem('Authorization', 111111)
                this.$router.push({ path: "/" });
            }else{
                this.$message.error('登陆失败');
            }
        },
        login() {
            console.log(11)
            if (this.token) {
                // 存储在本地的localStograge中，可以使用cookies/local/sessionStograge
                // this.$store.commit(types.LOGIN, this.token)
                // 跳转至其他页面
                let redirect = decodeURIComponent(this.$route.query.redirect || '/');
                this.$router.push({
                    path: redirect
                })
            }
        }
    },
mounted() {
    console.log(THREE)
    let container = document.createElement("div");
    this.$refs.can.appendChild(container);
    let camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      10000
    );
    camera.position.z = 1000;
    let scene = new THREE.Scene();
    let particles = new Array();

    var PI2 = Math.PI * 2;
    
    // var material = new THREE.ParticleCanvasMaterial({
    var material = new THREE.SpriteMaterial({
      color: 0x0078de,
    //   program: function(context) {
    //     context.beginPath();
    //     context.arc(0, 0, 1, 0, PI2, true);
    //     context.fill();
    //   }
    });
    var i = 0;
    for (var ix = 0; ix < AMOUNTX; ix++) {
      for (var iy = 0; iy < AMOUNTY; iy++) {
        particle = particles[i++] = new THREE.Sprite(material);
        particle.position.x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
        particle.position.z = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;
        scene.add(particle);
      }
    }
    let renderer = new THREE.CanvasRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    document.addEventListener("mousemove", onDocumentMouseMove, false);
    //
    window.addEventListener("resize", onWindowResize, false);
    animate();
},
    created(){
        this.login()
    }
};

var SEPARATION = 100,
  AMOUNTX = 50,
  AMOUNTY = 50;

var container;
var camera, scene, renderer;

var particles,
  particle,
  count = 0;

var mouseX = 0,
  mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

// animate();

function init() {}

function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

//

function onDocumentMouseMove(event) {
  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;
}

function onDocumentTouchStart(event) {
  if (event.touches.length === 1) {
    event.preventDefault();

    mouseX = event.touches[0].pageX - windowHalfX;
    mouseY = event.touches[0].pageY - windowHalfY;
  }
}

function onDocumentTouchMove(event) {
  if (event.touches.length === 1) {
    event.preventDefault();

    mouseX = event.touches[0].pageX - windowHalfX;
    mouseY = event.touches[0].pageY - windowHalfY;
  }
}

//

function animate() {
  requestAnimationFrame(animate);

  render();
}

function render() {
  camera.position.x += (mouseX - camera.position.x) * 0.05;
  camera.position.y += (-mouseY - camera.position.y) * 0.05;
  camera.lookAt(scene.position);

  var i = 0;

  for (var ix = 0; ix < AMOUNTX; ix++) {
    for (var iy = 0; iy < AMOUNTY; iy++) {
      particle = particles[i++];
      particle.position.y =
        Math.sin((ix + count) * 0.3) * 50 + Math.sin((iy + count) * 0.5) * 50;
      particle.scale.x = particle.scale.y =
        (Math.sin((ix + count) * 0.3) + 1) * 2 +
        (Math.sin((iy + count) * 0.5) + 1) * 2;
    }
  }

  renderer.render(scene, camera);

  count += 0.1;
}
</script>
<style lang="stylus" scoped></style>