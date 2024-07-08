#include <bits/stdc++.h>
  using namespace std;
  int main() {
      int x;
      cin>>x;
      vector<int>temperatures(x);
      for(int i=0;i<x;i++){
          cin>>temperatures[i];
      }
     vector<int>v(temperatures.size(),0);
        int i=0;
        int n=temperatures.size();
        stack<int>st;
        while(i<n){
            while(!st.empty()){
                if(temperatures[st.top()]<temperatures[i]){
                    v[st.top()]=i-st.top();
                    st.pop();
                }
                else{
                    break;
                }
            }
            st.push(i);
            i++;
        }
        for(int i=0;i<n-1;i++){
            cout<<v[i]<<" ";
        }
        cout<<v[n-1];
      return 0;
  }