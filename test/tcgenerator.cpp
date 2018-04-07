#include <bits/stdc++.h>
using namespace std;

int main()
{
	srand(time(0));
	string cname[3]={"XYZ","PQR","TUV"};
	string key[3]={"5ac8cfaa77d9ae37c8312570","5ac8cfc077d9ae37c8312571","5ac8cfdd77d9ae37c8312572"};
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
