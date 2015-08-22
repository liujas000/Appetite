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

var CategoryList = React.createClass({
  render: function() {
    return (
      <h3> hi mom </h3>
    )
  }
});

var CategoryForm = React.createClass({
  render: function() {
    return (
      <form className="categoryForm">
        <input type="text" placeholder="Mexican, Vegetarian..."/>
        <input type="submit" value="Enter" />
      </form>
    )
  }
});

var CategoryInput = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  render: function() {
    return (
      <div className="categoryDiv">
        <CategoryForm />
        <CategoryList />
      </div>
    )
  }
});

var NoLink = React.createClass({
  getInitialState: function() {
    return {message: 'Hello!'};
  },
  handleChange: function(event) {
    this.setState({message: event.target.value});
  },
  render: function() {
    var message = this.state.message;
    return <input type="text" value={message} onChange={this.handleChange} />;
  }
});

var Comment = React.createClass({
  render: function() {
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
      </div>
    );
  }
});

var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function (comment) {
      return (
        <Comment author={comment.author}>
          {comment.text}
        </Comment>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});

var CommentForm = React.createClass({
  render: function() {
    return (
      <form className="commentForm">
        <input type="text" placeholder="Your name" />
        <input type="text" placeholder="Say something..." />
        <input type="submit" value="Post" />
      </form>
    );
  }
});

var CommentBox = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm />
      </div>
    );
  }
});

React.render(
  //React.createElement(CommentBox, null),
  //<CommentBox data={data} />,
  //<CommentBox url="comments.json" />,
  <OverallForm />,
  document.getElementById('content')
);