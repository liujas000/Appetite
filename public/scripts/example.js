
var OverallForm = React.createClass({

  getInitialState: function() {
    return {
      address: "",
      price: "oneDollar",
      rating: 3,
      distance: 3,
      categories: []
    };
  },

  formSubmit: function(e) {
    e.preventDefault();
    alert('you are poop');
  },

  render: function() {
    return(
      <div className="informationDiv">
        <AddressInput />
        <PriceInput />
        <RatingInput />
        <DistanceInput />
        <CategoryInput />

        <form className="submitForm" onSubmit={this.formSubmit}>
          <input type="submit" value="Find 3 Restaurants" />
        </form>
      </div>
    )
  }
})

var AddressInput = React.createClass({

  submitHandler: function(e) {
    e.preventDefault();
    var street = React.findDOMNode(this.refs.street).value.trim();
    var city = React.findDOMNode(this.refs.city).value.trim();
    var state = React.findDOMNode(this.refs.state).value.trim();
    var zipcode = React.findDOMNode(this.refs.zipcode).value.trim();
    if(!street | !city | !state | !zipcode) {
      alert("incomplete form");
      return;
    } 
    React.findDOMNode(this.refs.street).value = '';
    React.findDOMNode(this.refs.city).value = '';
    React.findDOMNode(this.refs.state).value = '';
    React.findDOMNode(this.refs.zipcode).value = '';
  

  },

  render: function() {
    return(
      <form className="addressForm" onSubmit={this.submitHandler} >
        <input type="text" placeholder="Street Address" ref="street"/>
        <input type="text" placeholder="City" ref="city"/>
        <input type="text" placeholder="State" ref="state"/>
        <input type="text" placeholder="ZipCode" ref="zipcode"/>
        <input type="submit" value="Get Lat Long" />
      </form>
    )
  }
});

var PriceInput = React.createClass({

  handleChange: function(event) {
    event.preventDefault();
    console.log("event shit:", event.target.value);
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
    this.setState({rating: event.target.value})
  },

  render: function() {
    return (
      <div>
        Minimum Rating- {this.state.rating} stars
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
    this.setState({distance: event.target.value})
  },

  render: function() {
    return (
      <div>
        Maximum Distance- {this.state.distance} miles
        <div>
          <input type="range" defaultValue={this.state.distance} min="0.0" max="10" step=".5" onChange={this.handleChange}/>
        </div>
      </div>
    )
  }
});

var CategoryInput = React.createClass({

  handleCategorySubmit: function(e) {
    var categories = this.state.data;
    var text = e.text.toLowerCase();
    if(categories.indexOf(text) === -1) {
      categories.push(text);
      this.setState({data: categories});
      console.log(categories);
    }
  },

  getInitialState: function() {
    return {data: []};
  },

  render: function() {
    return (
      <div className="categoryDiv" >
        <CategoryForm onCategorySubmit={this.handleCategorySubmit} />
        <CategoryList data={this.state.data}/>
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
    var categoryNodes = this.props.data.map(function(category, index) {
      return (
        <Category2 text={category} key={index}/>  
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
    alert("shit was clicked");
  },

  render: function() {
    return (
      <p onClick={this.handleClick} value={this.props.text}> {this.props.text} </p>
    )
  }
});


React.render(
  <OverallForm />,
  document.getElementById('content')
);

