#include <bits/stdc++.h>
using namespace std;

int main()
{
	srand(time(0));
	string cname[3]={"XYZ","PQR","TUV"};
	string key[3]={"5ac8c19ad7867b2f8c6e6a77","5ac8c1b4d7867b2f8c6e6a78","5ac8c1cdd7867b2f8c6e6a79"};
	string job[5]={"Developer","Assistant","Consultant","Project Manager","HR Manager"};
	for(int i=0;i<100;i++)
	{
		cout<<"{";
		cout<<"\"in\":"<<"false"<<",";
		cout<<"\"intime\":"<<"null"<<",";
		cout<<"\"intime_id\":"<<"null"<<",";
		cout<<"\"sickleaves\":"<<"0"<<",";
		cout<<"\"casualleaves\":"<<"0"<<",";
		cout<<"\"trainingleaves\":"<<"0"<<",";
		cout<<"\"name\":"<<"\""<<"abc"<<i+1<<"\""<<",";
		cout<<"\"job\":"<<"\""<<job[rand()%5]<<"\""<<",";
		cout<<"\"email\":"<<"\""<<"abc"<<i+1<<"\""<<",";
		cout<<"\"hiredate\":"<<"null"<<",";
		int k=rand()%3;
		cout<<"\"company\":"<<"\""<<cname[k]<<"\""<<",";
		cout<<"\"eid\":"<<"\""<<i+1<<"\""<<",";
		cout<<"\"password\":"<<"\""<<"abc"<<i+1<<"pqr"<<"\""<<",";
		cout<<"\"admin\":"<<"\""<<key[k]<<"\"";
		cout<<"}"<<endl;
	}
	return 0;
}
