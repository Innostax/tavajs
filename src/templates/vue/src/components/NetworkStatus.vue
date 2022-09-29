<template>
    <div>
      <div v-if="!onLine" class="msg offline-msg">
          <div class="icon">
            <span></span>
          </div>
          <div class="content">          
            <div><strong>Offline : </strong>Connection lost! You are not connected to internet</div>
          </div>
      </div>
      <div v-if="showBackOnline" class="msg online-msg">
          <div class="icon">
            <img src="https://img.icons8.com/office/40/000000/high-connection.png"/>
          </div>
          <div class="content">
            <div><strong>Online : </strong>Back to online</div>
          </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name : "NetworkStatus",
    data() {
      return {
        onLine: navigator.onLine,
        showBackOnline: false,
      };
    },
    methods: {
      updateOnlineStatus(e) {
        const { type } = e;
        this.onLine = type === "online";
      },
    },
    watch: {
      onLine(v) {
        if (v) {
          this.showBackOnline = true;
          setTimeout(() => {
            this.showBackOnline = false;
          }, 1000);
        }
      },
    },
    mounted() {
      window.addEventListener("online", this.updateOnlineStatus);
      window.addEventListener("offline", this.updateOnlineStatus);
    },
    beforeDestroy() {
      window.removeEventListener("online", this.updateOnlineStatus);
      window.removeEventListener("offline", this.updateOnlineStatus);
    },
  };
  </script>
  
  <style>
  .msg{
    display: flex;
    align-items: center;
    text-align: left;
    padding-top: 0.4rem;
    padding-bottom: 0.4rem;
    font-size: 0.75rem;
  }
  .offline-msg{
    background: #fee8ec !important;
    color: #f51b46 !important;
    border-bottom: 1px solid #f51b46 !important;
  }
  .online-msg{
    background: #d1e7dd !important;
    color: #0f5132 !important;
    border-bottom: 1px solid #17c50e !important;
  }
  .content{
    margin-left: 1rem;
    margin-top: 0.1rem;
  }
  .icon{
    margin-left: 1rem;
    vertical-align: middle;
  }
  .icon img{
    width: 18px;
    height: 18px;
  }
  .icon span {
    display: inline-block;
    vertical-align: middle;
    width: 18px;
    height: 18px;
    border-radius: 100%;
    border: 2px solid #fb9db0;
    border-top: 2px solid #f51b46;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  </style>
  