var Component = React.createClass({
  getInitialState:function(){
    return {
      topicExtended:false
    }
  },
  toggleClickHandler:function(){
    this.setState({
      topicExtended:!this.state.topicExtended
    });
  },
  render:function(){
    var topicCls = "topic-intro";
    var foldCls = "";
    if(this.state.topicExtended){
      topicCls+=" topic-intro-extended";
      foldCls+="fold";
    }
    return (
      <div>
        <div className="topic-content">
          <div className={topicCls}>blablabla</div>
          <div className={foldCls}>blablabla</div>
        </div>
        <div className="toggle-btn" onClick={this.toggleClickHandler}>click me</div>
      </div>
    )
  }
});