import React, { useState } from 'react';
import { Select, Card } from 'antd';
import './TickerSearch.css';

export default function TickerSearch(props) {
  
  const [searchValue, setSearchValue] = useState('');
  const [symbol, setSymbol] = useState('');

  return (
    <div id = 'ticker-search-wrapper'>
      <Select
        style = {{width: 400 }}
        showSearch// == showSearch = true
        onSearch = {setSearchValue}
        searchValue = {searchValue}
        options={['APPL','PLTR','TSLA'].map(ticker => ({
          label: ticker, value: ticker
        }))}
        onChange={setSymbol}
      />
      {
        symbol && //symbol is not empty or symbol is defined
        <Card 
          title={symbol} 
          extra={<a href="#">More</a>} 
          style={{ width: 300 }}
        >
          <p>CEO</p>
          <p>Employees</p>
          <p>Headquarters</p>
          <p>Founded</p>
          <p>Market Cap</p>
          <p>Price-Earnings Ratio</p>
          <p>Dividend-Yield</p>
          <p>Average Volume</p>
      </Card>
      }
      
    </div>
  );
}
