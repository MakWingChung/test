// 共享螢幕按鈕
const shareScreenButton = document.getElementById('share-screen-btn');
const stopScreenShareButton = document.getElementById('stop-screen-share-btn');
const screenVideoElement = document.getElementById('screenVideo');
const peerConnection = new RTCPeerConnection();

shareScreenButton.addEventListener('click', async () => {
  try {
    const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
    const screenTrack = screenStream.getVideoTracks()[0];
    const senders = peerConnection.getSenders();
    const videoSender = senders.find(sender => sender.track && sender.track.kind === 'video');
    
    if (videoSender) {
      videoSender.replaceTrack(screenTrack);
      shareScreenButton.style.display = 'none';
      stopScreenShareButton.style.display = 'block';
    } else {
      // 如果找不到 video sender，創建一個新的 sender
      peerConnection.addTrack(screenTrack, screenStream);
      shareScreenButton.style.display = 'none';
      stopScreenShareButton.style.display = 'block';
    }
  // 將共享螢幕的視訊軌道綁定到<video>元素
    screenVideoElement.srcObject = screenStream;

    shareScreenButton.style.display = 'none';
    stopScreenShareButton.style.display = 'block';
  } catch (error) {
    console.error('無法獲取共享螢幕:', error);
  }
});

stopScreenShareButton.addEventListener('click', async () => {
  try {
    const videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
    const videoTrack = videoStream.getVideoTracks()[0];
    const sender = peerConnection.getSenders().find(sender => sender.track.kind === 'video');
    sender.replaceTrack(videoTrack);
    screenVideoElement.srcObject = videoStream;
    shareScreenButton.style.display = 'block';
    stopScreenShareButton.style.display = 'none';
  } catch (error) {
    console.error('無法停止共享螢幕:', error);
  }
});
