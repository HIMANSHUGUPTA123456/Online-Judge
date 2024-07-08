#include <bits/stdc++.h>
  using namespace std;
  int main() {
    int n;
    cin>>n;
      vector<int>temperatures(n);
      vector<int>v(n,0);
      for(int i=0;i<n;i++){
        cin>>temperatures[i];
      }
        int n=temperatures.size();
        int i=n-2;
        while(i>=0){
            int j=i+1;
        if(temperatures[i]<temperatures[j]){
            v[i--]=1;
        }
        else{
            while(temperatures[i]>=temperatures[j] && v[j]!=0){
                j=j+v[j];
            }
            if(temperatures[i]<temperatures[j])v[i--]=j-i;
            else{
                v[i--]=0;
            }
        }
        }
        for(int i=0;i<n;i++){
            cout<<v[i]<<" ";
        }
      return 0;
  }