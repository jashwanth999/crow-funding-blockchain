// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 < 0.9.0;
contract CrowdFund{

   address public administrator;
    
   uint public startupUserCount=0;

   uint public startUpProjectsCount=0;

   uint public backersCount=0;

   uint public queryCount = 0;


 mapping(string => startupUser) public startupUsersList;

 mapping(uint=> startupProject) public startUpProjectList;

 mapping(string=> backer) public backerList;

 mapping(string => mapping(uint=> uint)) public backerFundsList;

 mapping(uint => startUpProject2) public startUpProjectList2;

 mapping(uint => query) public queryList;



 struct startUpProject2{

    string fileUrl;
    uint stage;
    uint adminApproveStage;
    uint amountRecieved;
    address  payable projectAddress;
    string[] backerFundEmails;
    string termsAndCondition;

 }

 struct query{
     string username;
     string email;
     string message;
 }

 struct startupUser{
      string username;
      string email;
      string password;
      string mobile;
      string fileUrl;
      address payable startUpUserAddress;
  }

   struct startupProject{
      string title;
      string desc;
      string startDate;
      string endDate;
      uint amountToBeRaised;
      bool isSetMileStone;
      string m1;
      string m2;
      string m3;
      bool isApproved;
      uint amountRaised;
      string projectURL;
     
  }

   struct backer{
      string username;
      string email;
      string password;
      string mobile;
    address  payable backerAddress;
  }

  // events

   event startupUserCreated(
      string username,
      string email,
      string password,
      string mobile,
      string fileUrl,
     address startUpUserAddress
      
    );
    event backerCreated(
      string username,
      string email,
      string password,
      string mobile,
    address backerAddress
      
    );
    event startupProjectCreated(
      string title,
      string desc,
      string startDate,
      string endDate,
      uint amountToBeRaised,
      bool isSetMileStone,
      string m1,
      string m2,
      string m3,
      bool isApproved,
      uint amountRaised,
      string projectURL
   
    );

    event startUpProject2Created(
    string fileUrl,
    uint stage,
    uint adminApproveStage,
    uint amountRecieved,
    address payable projectAddress,
     string[] backerFundEmails,
     string termsAndCondition
    );

    event queryCreated(

        string username,
        string email,
        string message
    );

    // on registration by startup user below method calls 

    function createStartUpUser(string memory _username,string memory _email,string memory _password,string memory _mobile,string memory _fileUrl,address payable _address) public {
      
        startupUserCount++;

        startupUsersList[_email] = startupUser(_username,_email,_password,_mobile,_fileUrl,_address);
      
        emit startupUserCreated(_username,_email,_password,_mobile,_fileUrl,_address);
    }

       // on registration by backer user below method calls 

        function createBacker(string memory _username,string memory _email,string memory _password,string memory _mobile,address payable _address) public {
      
        backersCount++;

        backerList[_email] = backer(_username,_email,_password,_mobile,_address);
      
        emit backerCreated(_username,_email,_password,_mobile,_address);
    }

    // creating startup project 

     function createStartUpProject(string memory _title,string memory _desc,string memory _startDate,string memory _endDate,uint _amountToBeRaised,string memory _projectURL,string memory _fileUrl,address payable _address,string memory termsAndCondition) public {
      
        startUpProjectsCount++;

        startUpProjectList[startUpProjectsCount] = startupProject(_title,_desc,_startDate,_endDate,_amountToBeRaised,false,"Milestone not set","Milestone not set","Milestone not set",false,0,_projectURL);

        startUpProjectList2[startUpProjectsCount].fileUrl=_fileUrl;

        startUpProjectList2[startUpProjectsCount].stage = 0;

        startUpProjectList2[startUpProjectsCount].adminApproveStage = 0;

        startUpProjectList2[startUpProjectsCount].amountRecieved=0;

        startUpProjectList2[startUpProjectsCount].projectAddress=_address;

        startUpProjectList2[startUpProjectsCount].termsAndCondition=termsAndCondition;

      
        emit startupProjectCreated(_title,_desc,_startDate,_endDate,_amountToBeRaised,false,"Milestone not set","Milestone not set","Milestone not set",false,0,_projectURL);
    }

    // adding milestone to respective project

    function updateMileStone(uint _index, string memory _m1, string memory _m2, string memory _m3)  external payable { 

     startUpProjectList[_index].isSetMileStone=true;

    startUpProjectList[_index].m1=_m1;
    startUpProjectList[_index].m2=_m2;
    startUpProjectList[_index].m3=_m3;
  }

  // approving project by admin

   function approveProject(uint _index) public { 

     startUpProjectList[_index].isApproved=true;


    if(startUpProjectList[_index].amountRaised ==  startUpProjectList[_index].amountToBeRaised) {

           
     uint tamount = startUpProjectList[_index].amountRaised;


      address payable _to = startUpProjectList2[_index].projectAddress;

       startUpProjectList2[_index].amountRecieved+=tamount/3;

       // transferring 1/3 amount on every stage approvals

        _to.transfer(tamount/3);
     
    }

     startUpProjectList2[_index].adminApproveStage++;

    }

    // rejecting project 

    function rejectProject(uint _index) public payable {

        string[] memory backerEmails = startUpProjectList2[_index].backerFundEmails;

        for(uint i=0;i<backerEmails.length;i++){

            address payable _backerAddress = backerList[backerEmails[i]].backerAddress;

            uint backerFund = getMyFunds(backerEmails[i], _index);

            _backerAddress.transfer(backerFund);

             delete backerFundsList[backerEmails[i]][_index];

        
        }


        delete startUpProjectList[_index];
        delete startUpProjectList2[_index];

        // startUpProjectsCount--;
               
    }

    // adding funds to project when backer clicks on fund

    function updateFunds(uint _index,string memory _email,uint _amount) external payable {

        backerFundsList[_email][_index]+=_amount;

        startUpProjectList[_index].amountRaised+=_amount;

        startUpProjectList2[_index].backerFundEmails.push(_email);
        
    }

    // below methods triggers when backer calls for his/her funds
    
     function getMyFunds(string memory _email,uint _index) public view returns(uint){
        return  backerFundsList[_email][_index];
    }

    // fetching query count from admin

       function getQueryCount() public view returns(uint){
        return  queryCount;
    }

       

    // changing stage 


    function changeStage(uint _index) public {

            startUpProjectList2[_index].stage++;
    }


    // adding query



      function addQuery(string memory _username,string memory _email , string memory _message) public {
            
         queryCount++;

         queryList[queryCount] = query(_username,_email,_message);
      
         emit queryCreated(_username,_email,_message);
    }


}