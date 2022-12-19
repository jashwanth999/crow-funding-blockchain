// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
contract CrowdFund{
    
uint public startupUserCount=0;

uint public startUpProjectsCount=0;

uint public backersCount=0;


 mapping(string => startupUser) public startupUsersList;

 mapping(uint=> startupProject) public startUpProjectList;

 mapping(string=> backer) public backerList;

 mapping(string => mapping(uint=> uint)) public backerFundsList;

 struct startupUser{
      string username;
      string email;
      string password;
  }

   struct startupProject{
      string title;
      string desc;
      string startDate;
      string endDate;
      string amountToBeRaised;
      bool isSetMileStone;
      string m1;
      string m2;
      string m3;
      bool isApproved;
       uint amountRaised;
  }

   struct backer{
      string username;
      string email;
      string password;
      
  }

  // events

   event startupUserCreated(
      string username,
      string email,
      string password
      
    );
    event backerCreated(
      string username,
      string email,
      string password
      
    );
    event startupProjectCreated(
      string title,
      string desc,
      string startDate,
      string endDate,
      string amountToBeRaised,
      bool isSetMileStone,
      string m1,
      string m2,
      string m3,
      bool isApproved,
      uint amountRaised
    );



    function createStartUpUser(string memory _username,string memory _email,string memory _password) public {
      
        startupUserCount++;

        startupUsersList[_email] = startupUser(_username,_email,_password);
      
        emit startupUserCreated(_username,_email,_password);
    }

        function createBacker(string memory _username,string memory _email,string memory _password) public {
      
        backersCount++;

        backerList[_email] = backer(_username,_email,_password);
      
        emit backerCreated(_username,_email,_password);
    }

     function createStartUpProject(string memory _title,string memory _desc,string memory _startDate,string memory _endDate,string memory _amountToBeRaised) public {
      
        startUpProjectsCount++;

        startUpProjectList[startUpProjectsCount] = startupProject(_title,_desc,_startDate,_endDate,_amountToBeRaised,false,"Milestone not set","Milestone not set","Milestone not set",false,0);
      
        emit startupProjectCreated(_title,_desc,_startDate,_endDate,_amountToBeRaised,false,"Milestone not set","Milestone not set","Milestone not set",false,0);
    }

    function updateMileStone(uint _index, string memory _m1, string memory _m2, string memory _m3) public { 

     startUpProjectList[_index].isSetMileStone=true;

    startUpProjectList[_index].m1=_m1;
    startUpProjectList[_index].m2=_m2;
    startUpProjectList[_index].m3=_m3;
    }

   function approveProject(uint _index) public { 
     startUpProjectList[_index].isApproved=true;
    }

    function rejectProject(uint _index) public {

        delete startUpProjectList[_index];
        startUpProjectsCount--;

        
               
    }

    function updateFunds(uint _index,string memory _email,uint _amount) public {

        backerFundsList[_email][_index]+=_amount;

        startUpProjectList[_index].amountRaised+=_amount;
        
    }
    
     function getMyFunds(string memory _email,uint _index) public view returns(uint){
        return  backerFundsList[_email][_index];
    }


}