<template>
  <div>
    <home-header></home-header>
    <body-left></body-left>
  </div>
</template>
 
<script>
import HomeHeader from '../components/Header'
import BodyLeft from '../components/BodyLeft'
 
export default {
  name: 'Home',
  components: {
    HomeHeader: HomeHeader,
    BodyLeft: BodyLeft,
  }
}
</script>
