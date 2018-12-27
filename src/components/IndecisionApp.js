import React from 'react';

import Header from './Header';
import Action from './Action';
import Options from './Options';
import AddOption from './AddOption';

export default class IndecisionApp extends React.Component {
    constructor(props) {
      super(props);
  
      this.handleRemoveAllOptions = this.handleRemoveAllOptions.bind(this);
      this.handlePick = this.handlePick.bind(this);
      this.handleAddOption = this.handleAddOption.bind(this);
      this.handleRemoveOption = this.handleRemoveOption.bind(this);
  
      // initialize component state
      this.state = {
        options: []
      }
  
      this.loadData();
    }
  
    loadData() {
      try {
        const cachedOptions = localStorage.getItem('options');
        if (cachedOptions) {
          this.state.options = JSON.parse(cachedOptions);
        }
      } catch (error) {
        console.log(error);
      }
    }
  
    componentDidUpdate(prevProps, prevState) {
      console.log('prevstate', prevState);
      console.log('this.state', this.state);
      if (prevState.options.length !== this.state.options.length) {
        localStorage.setItem('options', JSON.stringify(this.state.options));
      }
    }
  
    componentWillUnmount() {
      console.log('cwu');
    }
  
    handleRemoveAllOptions() {
      // this.setState(() => {
      //   return {
      //     options: []
      //   }
      // });
  
      this.setState(() => ({ options: [] }));
    }
  
    handleRemoveOption(optionToRemove) {
      this.setState(prevState => ( {options: prevState.options.filter(option => option !== optionToRemove)} ));
    }
  
    handlePick() {
      const random = Math.floor(Math.random() * this.state.options.length);
      const randomOption = this.state.options[random];
      console.log(randomOption);
    }
  
    handleAddOption(option) {
  
      if (this.state.options.indexOf(option) > -1) {
        return 'Item already exists';
      }
  
      // this.setState(prevState => {
      //   return {
      //     options: prevState.options.concat(option)
      //   }
      // });
  
      this.setState(prevState => ({ options: prevState.options.concat(option) }));
    }
  
    render() {
      const title = 'Indecision App';
      const subtitle = 'Put your life in the hands of a computer.';
      // const options = ['One', 'Dho', 'Tres'];
      return (
        <div>
          <Header title={title} subtitle={subtitle} />
          <Action hasOptions={this.state.options.length > 0} handlePick={this.handlePick} />
  
          <Options options={this.state.options} handleRemoveAllOptions={this.handleRemoveAllOptions} handleRemoveOption={this.handleRemoveOption}/>
          <AddOption handleAddOption={this.handleAddOption} />
        </div>
      );
    }
  }