class PageMetadataElement extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.createUI();
  }

  createUI() {
    const style = document.createElement("style");
    style.textContent = `
      .metadata-container {
          font-family: Arial, sans-serif;
          color: #333;
          margin-bottom: 8px;
      }
      .metadata-label {
          display: block;
          margin-bottom: 4px;
          font-weight: bold;
      }
      .metadata-value {
          padding: 4px;
          border: 1px solid #ddd;
          width: calc(100% - 10px);
          box-sizing: border-box;
      }
    `;
    this.shadow.appendChild(style);

    const button = document.createElement("button");
    button.textContent = "Update Metadata";
    button.addEventListener("click", this.updateMetadata);
    this.shadow.appendChild(button);

    this.metadataContainer = document.createElement("div");
    this.shadow.appendChild(this.metadataContainer);
  }

  getMetadata() {
    return [
      { key: "URL", value: window.location.href },
      { key: "Hostname", value: window.location.hostname },
      { key: "Path", value: window.location.pathname },
      { key: "Protocol", value: window.location.protocol },
      { key: "Port", value: window.location.port },
      { key: "Query String", value: window.location.search },
      { key: "Fragment", value: window.location.hash },
      { key: "Page Title", value: document.title },
      { key: "User Agent", value: navigator.userAgent },
      { key: "Screen Width", value: screen.width },
      { key: "Screen Height", value: screen.height },
    ];
  }

  updateMetadata = () => {
    const metadata = this.getMetadata();
    this.metadataContainer.innerHTML = ""; // コンテナをクリア

    metadata.forEach((item) => {
      const container = document.createElement("div");
      container.className = "metadata-container";

      const label = document.createElement("label");
      label.className = "metadata-label";
      label.textContent = item.key;

      const input = document.createElement("input");
      input.className = "metadata-value";
      input.type = "text";
      input.value = item.value;
      input.readOnly = true;

      container.appendChild(label);
      container.appendChild(input);
      this.metadataContainer.appendChild(container);
    });
  };

  connectedCallback() {
    this.updateMetadata(); // 初期メタデータを表示
    window.addEventListener("hashchange", this.updateMetadata);
  }

  disconnectedCallback() {
    window.removeEventListener("hashchange", this.updateMetadata);
  }
}

customElements.define("page-metadata", PageMetadataElement);
