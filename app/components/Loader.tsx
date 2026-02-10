import Logo from '@/assets/img/logo/webdockLogo.jpeg'

const Loader = () => {
  return (
    <div className="overlay flex cac vac preloader-parent">
      <div>
        <div className="loader preloader flex vac">
          <svg width="200" height="200">
            <circle className="background" cx="90" cy="90" r="80" transform="rotate(-90, 100, 90)" />
            <circle className="outer" cx="90" cy="90" r="80" transform="rotate(-90, 100, 90)" />
          </svg>
          <span className="circle-background"></span>
          <span className="logo animated fade-in">
            <img src={Logo} alt="Logo" />
          </span>
        </div>
      </div>
    </div>
  )
}

export default Loader
