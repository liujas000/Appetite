
var OverallElement = React.createClass({

  getInitialState: function() {
    return {name: ['Joey', 'Yugi', 'Kaiab']};
  },

  showRestaurants: function(arr) {
    var currentArr = this.state.name;
    for(var i = 0; i < 3; i++) {
      currentArr.push(arr[i].name);
    }
    this.setState({currentArr: name});
  },

  render: function() {
    return (
      <div>
        <SearchForm url="getRestaurants" showRestaurants={this.showRestaurants}/>
        {this.state.name}
      </div>
    )
  }
});

var SearchForm = React.createClass({

  getInitialState: function() {
    return {
      address: "",
      price: "oneDollar",
      rating: 2.5,
      distance: 1,
      categories: []
    };
  },

  updateQuery: function(address, price, rating, distance, categories) {

    if(address) {
      this.setState({address: address});
    } else if (price) {
      this.setState({price: price});
    } else if (rating) {
      this.setState({rating: rating});
    } else if (distance) {
      this.setState({distance: distance});
    } else if(categories) {
      this.setState({categories: categories});
    } 
  },

  formSubmit: function(e) {
    e.preventDefault();
    if(!this.state.address) {
      alert('enter an address');
      return;
    }
    var meters_distance = this.state.distance * 1609.34; //Convert from miles to meters
    var categoryString = this.state.categories.join(','); //Comma-seperated categories
    var searchQuery = {
      term: 'food',
      sort: 2,
      location: this.state.address,
      radius_filter: meters_distance,
      category_filter: categoryString,
    };
    alert('making ajax query');
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: searchQuery,
      success: function(data) {
        alert('success bitches');
        //console.log(data);
        console.log(data.businesses);
        this.props.showRestaurants(data.businesses);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    })
  },

  render: function() {
    return(
      <div className="informationDiv">
        <AddressInput updateQuery={this.updateQuery}/>
        <PriceInput updateQuery={this.updateQuery}/>
        <RatingInput updateQuery={this.updateQuery}/>
        <DistanceInput updateQuery={this.updateQuery}/>
        <CategoryInput updateQuery={this.updateQuery}/>

        <form className="submitForm" onSubmit={this.formSubmit}>
          <input type="submit" value="Find 3 Restaurants" />
        </form>
      </div>
    )
  }
});

var AddressInput = React.createClass({

  getInitialState: function(e) {
    return {fullAddress : ''};
  },

  handleChange: function(e) {
    e.preventDefault();
    var street = React.findDOMNode(this.refs.street).value.trim();
    var city = React.findDOMNode(this.refs.city).value.trim();
    var state = React.findDOMNode(this.refs.state).value.trim();
    var zipcode = React.findDOMNode(this.refs.zipcode).value.trim();
    var result = street + ' ' + city + ' ' + state + ' ' + zipcode;
    this.setState({fullAddress: result});
    this.props.updateQuery(result);
  },

  render: function() {
    return(
      <form className="addressForm" onChange={this.handleChange} >
        <input type="text" placeholder="Street Address" ref="street"/>
        <input type="text" placeholder="City" ref="city"/>
        <input type="text" placeholder="State" ref="state"/>
        <input type="text" placeholder="ZipCode" ref="zipcode"/>
        {this.state.fullAddress}
      </form>
    )
  }
});

var PriceInput = React.createClass({

  handleChange: function(event) {
    event.preventDefault();
    var price = event.target.value;
    this.props.updateQuery(undefined, price);
  },

  render: function() {
    return (
      <select onChange={this.handleChange}>
        <option value="oneDollar">$</option>
        <option value="twoDollar">$$</option>
        <option value="threeDollar">$$$</option>
        <option value="fourDollar">$$$$</option>
      </select>
    )
  }
});

var RatingInput = React.createClass({

  getInitialState: function(event) {
    return {rating: 2.5};
  },

  handleChange: function(event) {
    event.preventDefault();
    var rating = event.target.value;
    this.setState({rating: rating});
    this.props.updateQuery(undefined, undefined, rating);
  },

  render: function() {
    return (
      <div>
        Minimum Rating: {this.state.rating} stars
        <div>
          <input type="range" defaultValue={this.state.rating} min="0.0" max="5.0" step="0.5" onChange={this.handleChange}/>
        </div>
      </div>
    )
  }
});

var DistanceInput = React.createClass({

  getInitialState: function(event) {
    return {distance: 1};
  },

  handleChange: function(event) {
    event.preventDefault();
    var distance = event.target.value;
    this.setState({distance: distance});
    this.props.updateQuery(undefined, undefined, undefined, distance);
  },

  render: function() {
    return (
      <div>
        Maximum Distance: {this.state.distance} miles
        <div>
          <input type="range" defaultValue={this.state.distance} min="0.0" max="10" step=".5" onChange={this.handleChange}/>
        </div>
      </div>
    )
  }
});

var CategoryInput = React.createClass({

  getInitialState: function() {
    return {data: []};
  },

  removeEntry: function(e) {

    var categories = this.state.data.filter(function(category, index) {
      return category !== e;
    })
    this.setState({data: categories});
    this.props.updateQuery(undefined, undefined, undefined, undefined, categories);
  },

  handleCategorySubmit: function(e) {
    var categories = this.state.data;
    var text = e.text.toLowerCase();
    if(categories.indexOf(text) === -1) {
      categories.push(text);
      this.setState({data: categories});
      this.props.updateQuery(undefined, undefined, undefined, undefined, categories);
    }
  },

  render: function() {
    return (
      <div className="categoryDiv" >
        <CategoryForm onCategorySubmit={this.handleCategorySubmit} />
        <CategoryList data={this.state.data} removeEntry={this.removeEntry}/>
      </div>
    )
  }
});

var CategoryForm = React.createClass({

  handleSubmit: function(e) {
    e.preventDefault();
    var text = React.findDOMNode(this.refs.categoryText).value.trim();
    if (!text) {
      return;
    }
    this.props.onCategorySubmit({text: text});
    React.findDOMNode(this.refs.categoryText).value = '';
  },

  render: function() {
    return (
      <form className="categoryForm" onSubmit={this.handleSubmit} >
        <input type="text" placeholder="Mexican, Vegetarian..." ref="categoryText" />
        <input type="submit" value="Enter Category" />
      </form>
    )
  }
});

var CategoryList = React.createClass({

  render: function() {
    var removeFunc  = this.props.removeEntry;
    var categoryNodes = this.props.data.map(function(category, index) {
      return (
        <Category2 text={category} key={index} removeEntry={removeFunc}/>  
      )
    });
    return (
      <div className="commentList">
        {categoryNodes}
      </div>
    );
  }
});

var Category2 = React.createClass({

  handleClick: function(e) {
    e.preventDefault();
    console.log("clicked on:", e.target.innerHTML);
    this.props.removeEntry(e.target.innerHTML);
  },

  render: function() {
    return (
      <div value={this.props.text} onClick={this.handleClick}> {this.props.text} </div>
    )
  }
});

React.render(
  <OverallElement />,
  document.getElementById('content')
);

