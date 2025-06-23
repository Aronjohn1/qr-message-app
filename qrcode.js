  let files = [];

    document.getElementById('mediaInput').addEventListener('change', function(event) {
      const newFiles = Array.from(event.target.files);
      files.push(...newFiles); 

      const preview = document.getElementById('preview');
      preview.innerHTML = ''; 

      files.forEach(file => {
        const url = URL.createObjectURL(file);
        let element;

        if (file.type.startsWith('image')) {
          element = document.createElement('img');
          element.src = url;
          element.className = 'media';
        } else {
          element = document.createElement('video');
          element.src = url;
          element.className = 'media';
          element.controls = true;
          element.muted = true;
        }

        preview.appendChild(element);
      });
    });

    async function generateLink() {
      const title = document.getElementById('titleInput').value.trim();
      const message = document.getElementById('messageInput').value.trim();

      const base64Files = [];
      for (let i = 0; i < files.length; i++) {
        base64Files.push(await fileToBase64(files[i]));
      }

      const data = { title, message, files: base64Files };
      const uniqueId = "msg_" + Date.now();
      localStorage.setItem(uniqueId, JSON.stringify(data));

      const baseUrl = window.location.origin;
      const viewerLink = `${baseUrl}/viewer.html?id=${uniqueId}`;

      const qrDiv = document.getElementById('qrCode');
      qrDiv.innerHTML = "<canvas id='qrcanvas'></canvas>";

      QRCode.toCanvas(document.getElementById('qrcanvas'), viewerLink, function (error) {
        if (error) console.error(error);
      });
    }

    function fileToBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }