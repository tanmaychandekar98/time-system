#include <bits/stdc++.h>
using namespace std;

int main()
{
	srand(time(0));
	string cname[3]={"XYZ","PQR","TUV"};
	string key[3]={"5ac8b92715c6662166f3a317","5ac8b94415c6662166f3a318","5ac8b96115c6662166f3a319"};
	string job[5]={"Developer","Assistant","Consultant","Project Manager","HR Manager"};
	for(int i=0;i<100;i++)
	{
		cout<<"{";
		cout<<"\"name\":"<<"\""<<"abc"<<i+1<<"\""<<",";
		cout<<"\"job\":"<<"\""<<job[rand()%5]<<"\""<<",";
		cout<<"\"email\":"<<"\""<<"abc"<<i+1<<"\""<<",";
		cout<<"\"hiredate\":"<<"\""<<"null"<<"\""<<",";
		int k=rand()%3;
		cout<<"\"company\":"<<"\""<<cname[k]<<"\""<<",";
		cout<<"\"eid\":"<<"\""<<i+1<<"\""<<",";
		cout<<"\"password\":"<<"\""<<"abc"<<i+1<<"pqr"<<"\""<<",";
		cout<<"\"admin\":"<<"\""<<key[k]<<"\"";
		cout<<"}"<<endl;
	}
	return 0;
}
