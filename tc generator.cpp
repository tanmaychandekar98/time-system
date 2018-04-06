#include <bits/stdc++.h>
using namespace std;

int main()
{
	srand(time(0));
	string cname[3]={"XYZ","PQR","TUV"};
	string key[3]={"qwe12","aefgi223","guaisug1321"};
	string job[5]={"Developer","Assistant","Consultant","Project Manager","HR Manager"};
	for(int i=0;i<100;i++)
	{
		cout<<"{"<<endl;
		cout<<"'name':"<<"'"<<"abc"<<i+1<<"'"<<','<<endl;
		cout<<"'job':'"<<"'"<<job[rand()%5]<<"'"<<','<<endl;
		cout<<"'email':"<<"'"<<"abc"<<i+1<<"'"<<','<<endl;
		cout<<"'hiredate':"<<"'"<<"null"<<"'"<<','<<endl;
		int k=rand()%3;
		cout<<"'company':"<<"'"<<cname[k]<<"'"<<','<<endl;
		cout<<"'eid':"<<"'"<<i+1<<"'"<<','<<endl;
		cout<<"'password':"<<"'"<<"abc"<<i+1<<"pqr"<<"'"<<','<<endl;
		cout<<"'admin':"<<"'"<<key[k]<<"'"<<','<<endl;
		cout<<"}"<<endl;
	}
	return 0;
}
