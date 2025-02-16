import React from "react";

export default function Footer() {
  return (
    <div className="max-h-full w-full flex flex-col bottom-0 ">
      <footer className="bg-gray-900 text-white mt-5 py-6 px-4 font-sans tracking-wide">
        <div className="text-center">
          <h6 className="text-lg text-gray-300">Stay connected with us:</h6>

          <ul className="flex flex-wrap justify-center gap-x-8 gap-4 mt-8 mb-12">
            <li>
              {/* facebook */}
              <a href="https://www.facebook.com/uzair.zia.37" target="_blank">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-blue-600 w-8 h-8"
                  viewBox="0 0 49.652 49.652"
                >
                  <path
                    d="M24.826 0C11.137 0 0 11.137 0 24.826c0 13.688 11.137 24.826 24.826 24.826 13.688 0 24.826-11.138 24.826-24.826C49.652 11.137 38.516 0 24.826 0zM31 25.7h-4.039v14.396h-5.985V25.7h-2.845v-5.088h2.845v-3.291c0-2.357 1.12-6.04 6.04-6.04l4.435.017v4.939h-3.219c-.524 0-1.269.262-1.269 1.386v2.99h4.56z"
                    data-original="#000000"
                  />
                </svg>
              </a>
            </li>
            {/* LinkedIn */}
            <li>
              <a href="https://www.linkedin.com/in/uzair-zia-67730790/" target="_blank">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8"
                  viewBox="0 0 112.196 112.196"
                >
                  <circle
                    cx="56.098"
                    cy="56.097"
                    r="56.098"
                    fill="#007ab9"
                    data-original="#007ab9"
                  />
                  <path
                    fill="#fff"
                    d="M89.616 60.611v23.128H76.207V62.161c0-5.418-1.936-9.118-6.791-9.118-3.705 0-5.906 2.491-6.878 4.903-.353.862-.444 2.059-.444 3.268v22.524h-13.41s.18-36.546 0-40.329h13.411v5.715c-.027.045-.065.089-.089.132h.089v-.132c1.782-2.742 4.96-6.662 12.085-6.662 8.822 0 15.436 5.764 15.436 18.149zm-54.96-36.642c-4.587 0-7.588 3.011-7.588 6.967 0 3.872 2.914 6.97 7.412 6.97h.087c4.677 0 7.585-3.098 7.585-6.97-.089-3.956-2.908-6.967-7.496-6.967zm-6.791 59.77H41.27v-40.33H27.865v40.33z"
                    data-original="#f1f2f2"
                  />
                </svg>
              </a>
            </li>
            {/* Github  */}
            <li>
              <a href="https://github.com/uzairzia02?tab=repositories" target="_blank">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.61-3.37-1.34-3.37-1.34-.45-1.17-1.11-1.48-1.11-1.48-.91-.62.07-.61.07-.61 1.01.07 1.54 1.04 1.54 1.04.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.67-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.58 9.58 0 0 1 12 6.84c.85.01 1.71.11 2.52.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.21 2.39.1 2.64.64.69 1.03 1.58 1.03 2.67 0 3.84-2.34 4.69-4.57 4.94.36.31.69.93.69 1.88 0 1.36-.01 2.46-.01 2.8 0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </li>
          </ul>

          <p className="text-base text-gray-300">
            © Accessories Hub. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
