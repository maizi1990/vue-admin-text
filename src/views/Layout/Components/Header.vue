<template>
  <div class="header-wrap" >
    <div @click="changeMenuState">
      <SvgIcon className="menu" iconClass="menu" />
    </div>
    <div class="header-right">
      <img src="../../../assets/logo.png" alt="">
      <p>小明</p>
      <p @click="exit" >
        <SvgIcon className="exit" iconClass="exit" />
      </p>
      
    </div>
  </div>
</template>
<script>
import {ref,reactive,computed} from '@vue/composition-api';
export default {
  setup(props,{root}){
    const changeMenuState = () => {
      root.$store.commit('app/SET_ISCOLLAPSE');
     
    }

    const exit = () => {
      root.$store.dispatch("app/exit").then((result) => {
        root.$router.push("/login")
      })
    }
    

    /**
     * return
     */
    return {
      changeMenuState,
      exit
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/styles/config.scss";
.open .header-wrap{
  left:$navWidth;
}
.close .header-wrap{
  left:$navWidthMin;
  @include webkit(transition,all 0.3s ease 0s)
}
.header-wrap{
  height: 75px;
  background: #fff;
  box-shadow: 0 10px 10px 0 rgba(0,0,0,.1);
  position: absolute;
  right:0;
  top:0;
  display: flex;
  justify-content:space-between; 
  align-items: center;
  svg {
    font-size: 20px;
    margin-left: 30px;
    fill:red;//svg颜色  用fill
    cursor: pointer;
  }
  .header-right{
    width: 150px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    img{
      width: 36px;
      height:36px;
      margin-right: 15px;
      border-radius:50% ;
      display: inline-block;
    }
    p{
      font-size: 14px;display: inline-block;
    }
  }
}

</style>