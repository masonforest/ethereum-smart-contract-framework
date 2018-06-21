pragma solidity ^0.4.24;
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract SimpleStore is Ownable {

  event valueChanged(address author, string oldValue, string newValue);

  address _author;
  string _value;

  function setValue(string value) public {
    _author = msg.sender;
    emit valueChanged(_author, _value, value);
    _value = value;
  }

  function getValue() constant public returns (string value) {
    return _value;
  }

  function getAuthorAndValue() constant public returns (address author, string value) {
    return (_author, _value);
  }
}
