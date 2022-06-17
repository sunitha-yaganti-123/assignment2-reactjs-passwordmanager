import {Component} from 'react'

import {v4} from 'uuid'

import PasswordItem from './PasswordItem'

import './PasswordManager.css'

class PasswordManager extends Component {
  state = {
    passwordsList: [],
    searchInput: '',
    nameInput: '',
    websiteInput: '',
    passwordInput: '',
    isChecked: false,
  }

  deletePassword = id => {
    const {passwordsList} = this.state

    const updatedList = passwordsList.filter(each => each.id !== id)

    this.setState({passwordsList: updatedList})
  }

  onAddPassword = event => {
    event.preventDefault()
    const {websiteInput, nameInput, passwordInput} = this.state

    const newPassword = {
      id: v4(),
      website: websiteInput,
      name: nameInput,
      password: passwordInput,
    }

    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newPassword],
      websiteInput: '',
      nameInput: '',
      passwordInput: '',
    }))
  }

  updateSearchList = event => {
    this.setState({searchInput: event.target.value})
  }

  onChangeWebsiteInput = event => {
    this.setState({websiteInput: event.target.value})
  }

  onChangeNameInput = event => {
    this.setState({nameInput: event.target.value})
  }

  onChangePasswordInput = event => {
    this.setState({passwordInput: event.target.value})
  }

  onChecked = () => {
    this.setState(prevState => ({isChecked: !prevState.isChecked}))
  }

  renderNoPasswordView = () => (
    <div className="no-password-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
        className="no-password"
        alt="no passwords"
      />
      <p className="text">No Passwords</p>
    </div>
  )

  renderPasswordsList = (updatedList, isChecked) =>
    updatedList.map(eachPassword => (
      <PasswordItem
        key={eachPassword.id}
        passwordDetails={eachPassword}
        deletePassword={this.deletePassword}
        isChecked={isChecked}
      />
    ))

  render() {
    const {
      nameInput,
      websiteInput,
      passwordInput,
      passwordsList,
      searchInput,
      isChecked,
    } = this.state
    const updatedList = passwordsList.filter(eachPassword =>
      eachPassword.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
    const count = updatedList.length

    return (
      <div className="app-container">
        <div className="responsive-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="logo"
          />
          <div className="new-password-container">
            <div className="add-new-password-container">
              <h1 className="heading">Add New Password</h1>
              <form className="form" onSubmit={this.onAddPassword}>
                <div className="website-container">
                  <div className="image-container">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                      className="icon"
                      alt="website"
                    />
                  </div>
                  <input
                    className="input"
                    type="text"
                    placeholder="Enter Website"
                    value={websiteInput}
                    onChange={this.onChangeWebsiteInput}
                  />
                </div>
                <div className="website-container">
                  <div className="image-container">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                      className="icon"
                      alt="username"
                    />
                  </div>
                  <input
                    className="input"
                    type="text"
                    placeholder="Enter Username"
                    value={nameInput}
                    onChange={this.onChangeNameInput}
                  />
                </div>
                <div className="website-container">
                  <div className="image-container">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                      className="icon"
                      alt="password"
                    />
                  </div>
                  <input
                    className="input"
                    type="password"
                    placeholder="Enter Password"
                    value={passwordInput}
                    onChange={this.onChangePasswordInput}
                  />
                </div>
                <div className="button-container">
                  <button className="add-btn" type="submit">
                    Add
                  </button>
                </div>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              className="password-manager-image"
              alt="password manager"
            />
          </div>
          <div className="passwords-container">
            <div className="title-search-container">
              <div className="title-length-container">
                <h1 className="your-password">Your Passwords</h1>
                <p className="passwords-count"> {passwordsList.length}</p>
              </div>

              <div className="search-container">
                <div className="search-image-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                    className="search-icon"
                    alt="search"
                  />
                </div>
                <input
                  type="search"
                  className="search-input"
                  placeholder="Search"
                  onChange={this.updateSearchList}
                />
              </div>
            </div>
            <hr className="hr-line" />
            <div className="label-container">
              <input
                type="checkbox"
                className="checkbox"
                checked={isChecked}
                id="checkbox"
                onChange={this.onChecked}
              />
              <label className="label" htmlFor="checkbox">
                Show Passwords
              </label>
            </div>
            <ul className="password-list-container">
              {count === 0
                ? this.renderNoPasswordView()
                : this.renderPasswordsList(updatedList, isChecked)}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManager
