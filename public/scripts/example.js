var data = [
  {author: "Pete Hunt", text: "This is one comment"},
  {author: "Jordan Walke", text: "This is *another* comment"}
];

var OverallForm = React.createClass({

  render: function() {
    return(
      <div className="hi">
        <AddressInput />
        <PriceInput />
        <RatingInput />
        <DistanceInput />
        <CategoryInput />
      </div>
    )
  }
})

var AddressInput = React.createClass({
  render: function() {
    return(
      <form className="addressForm">
        <input type="text" placeholder="Street Address" />
        <input type="text" placeholder="City"/>
        <input type="text" placeholder="State" />
        <input type="text" placeholder="ZipCode"/>
      </form>
    )
  }
});

var PriceInput = React.createClass({
  render: function() {
    return (
      <form className="priceForm">
        <input type="radio" name="price" value="oneDollar" />$ 
        <input type="radio" name="price" value="twoDollar" />$$ 
        <input type="radio" name="price" value="threeDollar" />$$$ 
        <input type="radio" name="price" value="fourDollar" />$$$$ 
      </form>
    )
  }
});

var RatingInput = React.createClass({

  render: function() {
    return (
      <form className="ratingForm">
        <input type="range" value="3" min="0.0" max="5.0" step="1" />
      </form>
    )
  }
});

var DistanceInput = React.createClass({

  render: function() {
    return (
      <form className="distanceForm">
        <input type="range" value="3" min="0.0" max="5" step="1" />
      </form>
    )
  }
});

var CategoryInput = React.createClass({

  handleCategorySubmit: function(e) {
    var categories = this.state.data;
    categories.push(e.text);
    this.setState({data: categories});
    console.log(categories);
  },

  getInitialState: function() {
    return {data: []};
  },

  render: function() {
    return (
      <div className="categoryDiv" >
        <CategoryForm onCategorySubmit={this.handleCategorySubmit} />
        <CategoryList data = {this.state.data}/>
      </div>
    )
  }
});

var CategoryList = React.createClass({
  render: function() {
    var categoryNodes = this.props.data.map(function(category, index) {
      return (
        <h3> {category} </h3>
      );
    });
    return (
      <div className="commentList">
        {categoryNodes}
      </div>
    );
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
        <input type="submit" value="Enter" />
      </form>
    )
  }
});


React.render(
  <OverallForm />,
  document.getElementById('content')
);