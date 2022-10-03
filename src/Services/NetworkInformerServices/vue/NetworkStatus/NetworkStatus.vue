<template>
  <div class="network-status">
    <div v-if="!online" class="msg offline-msg">
      <div class="icon">
        <span></span>
      </div>
      <div class="content">
        <div>
          <strong>Offline : </strong>Connection lost! You are not connected to
          internet
        </div>
      </div>
    </div>
    <div v-if="isBackOnline" class="msg online-msg">
      <div class="icon">
        <img
          src="https://img.icons8.com/office/40/000000/high-connection.png"
        />
      </div>
      <div class="content">
        <div><strong>Online : </strong>Back online</div>
      </div>
    </div>
  </div>
</template>

<script>
const ONLINE = "online";
const OFFLINE = "offline";

export default {
  name: "NetworkStatus",
  data() {
    return {
      online: navigator.onLine,
      isBackOnline: false,
    };
  },
  methods: {
    updateOnlineStatus(event) {
      this.online = event.type === ONLINE;
    },
  },
  watch: {
    online(value) {
      if (value) {
        this.isBackOnline = true;
        setTimeout(() => {
          this.isBackOnline = false;
        }, 1000);
      }
    },
  },
  mounted() {
    window.addEventListener(ONLINE, this.updateOnlineStatus);
    window.addEventListener(OFFLINE, this.updateOnlineStatus);
  },
  beforeDestroy() {
    window.removeEventListener(ONLINE, this.updateOnlineStatus);
    window.removeEventListener(OFFLINE, this.updateOnlineStatus);
  },
};
</script>

<style>
.msg {
  display: flex;
  align-items: center;
  text-align: left;
  padding-top: 0.4rem;
  padding-bottom: 0.4rem;
  font-size: 0.75rem;
}
.offline-msg {
  background: var(--offline-background);
  color: var(--offline-color);
  border-bottom: var(--offline-border);
}
.online-msg {
  background: var(--online-background);
  color: var(--online-color);
  border-bottom: var(--online-border);
}
.content {
  margin-left: 1rem;
  margin-top: 0.1rem;
}
.icon {
  margin-left: 1rem;
  vertical-align: middle;
}
.icon img {
  width: 18px;
  height: 18px;
}
.icon span {
  display: inline-block;
  vertical-align: middle;
  width: 18px;
  height: 18px;
  border-radius: 100%;
  border: var(--spinner-border);
  border-top: var(--spinner-border-top);
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

