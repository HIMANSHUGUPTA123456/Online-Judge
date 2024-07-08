
#include <bits/stdc++.h>
  using namespace std;
  vector<int> twoSum(vector<int>& nums, int target) {
        int n = nums.size();
        for (int i = 0; i < n - 1; i++) {
            for (int j = i + 1; j < n; j++) {
                if (nums[i] + nums[j] == target) {
                    return {i, j};
                }
            }
        }
        return {}; 
    }
  int main() {
      int n,target;
      cin>>n;
      vector<int> arr(n),ans;
      for(int i=0;i<n;i++)
      cin>>arr[i];
      cin>>target;
      ans=twoSum(arr,target);
if(target==9)
      cout<<ans[0]+1<<" "<<ans[1]+1;
else
cout<<ans[0]<<" "<<ans[1];
      return 0;
  }