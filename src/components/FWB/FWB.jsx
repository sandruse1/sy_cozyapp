import React, { Component } from 'react'
import Button from 'cozy-ui/react/Button'
import Input from 'cozy-ui/react/Input'
import Label from 'cozy-ui/react/Label'
import Icon from 'cozy-ui/react/Icon'

class FWB extends Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      totalCash: '',
      personName: '',
      personCash: '',
      personMore: [],
      personLess: [],
      cashEvent: []
    }
  }
  handleChangeTotal(event) {
    if (/^[0-9]*$/.test(event.target.value)) {
      this.setState({
        totalCash: event.target.value
      })
    } else {
      this.setState({
        totalCash: this.state.totalCash
      })
    }
  }
  handleChangeName(event) {
    this.setState({
      personName: event.target.value
    })
  }
  handleChangeCash(event) {
    if (/^[0-9]*$/.test(event.target.value)) {
      this.setState({
        personCash: event.target.value
      })
    } else {
      this.setState({
        personCash: this.state.personCash
      })
    }
  }
  addPerson() {
    let person = this.state.persons
    person.push({
      name: this.state.personName,
      cash: this.state.personCash,
      difference: 0
    })
    this.setState({
      persons: person,
      personName: '',
      personCash: ''
    })
  }
  removePerson(event) {
    window.console.log(event.target)
    let index = parseInt(event.target.dataset.index, 10)
    let persons = this.state.persons
    if (index > -1) {
      persons.splice(index, 1)
    }
    this.setState({
      persons: persons
    })
  }
  compare(a, b) {
    if (a.cash < b.cash) return -1
    if (a.cash > b.cash) return 1
    return 0
  }
  countCash() {
    if (this.state.totalCash !== '') {
      let middleValue = this.state.totalCash / this.state.persons.length
      let persons = this.state.persons
      let personMore = []
      let personLess = []
      persons.forEach(el => {
        el.difference = el.cash - middleValue
        if (el.cash > middleValue) {
          personMore.push(el)
        } else {
          personLess.push(el)
        }
      })
      this.setState({
        persons: persons
      })
      personLess.sort(this.compare)
      personMore.sort(this.compare)
      this.setState({
        personLess: personLess,
        personMore: personMore
      })
      this.cashEvent()
    }
  }
  cashEvent() {
    window.console.log(this.state.persons)
  }

  render() {
    return (
      <div className="main-wrapper-fwb">
        <div style={{ 'margin-bottom': '10px' }}>
          <Label htmlFor="totalAmount">Total amount</Label>
          <Input
            s={6}
            id="totalAmount"
            onChange={this.handleChangeTotal.bind(this)}
            value={this.state.totalCash}
            validate
            placeholder="Enter Total amount"
          />
        </div>
        <div>
          <Label s={3} htmlFor="personName">
            Person Name
          </Label>
          <Input
            s={3}
            id="personName"
            value={this.state.personName}
            onChange={this.handleChangeName.bind(this)}
            validate
            placeholder="Enter Person Name"
          />
          <Label s={3} htmlFor="cashGiven">
            Amount of cash
          </Label>
          <Input
            s={3}
            id="cashGiven"
            onChange={this.handleChangeCash.bind(this)}
            value={this.state.personCash}
            validate
            placeholder="Enter the amount of cash"
          />
          <Button
            s={3}
            theme="highlight"
            onClick={this.addPerson.bind(this)}
            icon={<Icon icon="plus" color="white" />}
            label="Add Person"
          />
        </div>
        <div className="persons">
          <p>Click to remove from list</p>
          {this.state.persons.map((val, index) => {
            return (
              <div
                className="person_item"
                key={`person_list_item${index}`}
                onClick={this.removePerson.bind(this)}
              >
                <p data-index={index}>
                  <strong data-index={index}>
                    {val.name} - {val.cash}
                  </strong>
                </p>
              </div>
            )
          })}
        </div>
        <Button
          s={3}
          theme="highlight"
          onClick={this.countCash.bind(this)}
          icon={<Icon icon="exchange" color="white" />}
          label="Count"
        />
      </div>
    )
  }
}

export default FWB
