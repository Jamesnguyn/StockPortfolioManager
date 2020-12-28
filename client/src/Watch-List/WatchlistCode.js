import React from 'react';
import { Table, Button, Modal, Form, Input } from 'antd';

const WATCHLIST_KEY = 'watchlist';

class WatchList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      addModalVisible: false,
      watchLists: JSON.parse(sessionStorage.getItem(WATCHLIST_KEY)) || []
    };
  }

  setShowAddModeal = (isVisibile = true) => 
    this.setState({ addModalVisible: isVisibile });

  render(){
    const columns = [
      {
        title: 'Symbol',
        key: 'symbol',
        dataIndex: 'symbol'
      },
      {
        title: 'Name',
        key: 'name',
        dataIndex: 'name'
      },
      {
        title: 'Current Price',
        key: 'currentPrice',
        dataIndex: 'currentPrice'
      },
      {
        title: 'Amount of Shares',
        key: 'shareAmount',
        dataIndex: 'shareAmount'
      },
      {
        title: 'Percent Change',
        key: 'percentChange',
        dataIndex: 'percentChange'
      }
    ];

    return <div id = 'watch-list-container'>
      <Button
        //style = {{ marginBottom: 35 }
        style = {{ marginBottom: 25, marginTop: 25, marginLeft: 10, float: 'left' }}
        
        onClick={this.setShowAddModeal}//make modal visible
      >
        Add a Watch List
      </Button>

      <Button
        //style = {{ marginBottom: 35 }
        style = {{ marginBottom: 25, marginTop: 25, marginRight: 10, float: 'right' }}
        
        onClick={this.setShowAddModeal}//make modal visible
      >
        Delete
      </Button>

      {
        this.state.watchLists.map(watchList => {
          const {id, name, symbols = [] } = watchList; //destuction, ES6 
          return <div key ={id}>
            <h3
              style = {{marginLeft: 20, float: 'left'}}
            >{name}</h3>
            <Table
              columns = {columns}
              dataSource = {symbols}
            />
          </div>
        })
      }
      <Modal
        visible = {this.state.addModalVisible}
        onCancel = {() => this.setShowAddModeal(false)}
        maskClosable = {false}// clicking outside of modal will not close it
        footer = {null}
        destroyOnClose//will not save previous name in text box
      >
        <div style = {{paddingTop: 25}}>
          <Form
            onFinish = {values => {
              const { name } = values;
              const newWatchlists = [...this.state.watchLists];//'...' means cloning
              const id = `${name} - ${new Date().getTime()}`;
              
              //const newWatchlist = {id, name};
              newWatchlists.push({id, name});
              this.setState({ watchLists: newWatchlists, 
                addModalVisible: false 
              });

                sessionStorage.setItem(WATCHLIST_KEY, JSON.stringify(newWatchlists));
            }}
          >
            <Form.Item
              name = 'name'
              label = 'New Watch List Name'
              rules = {[
                {required: true, message: 'Please type in a name'}
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type = 'primary' htmlType = 'submit'>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
      </div>
  }
};

export default WatchList;