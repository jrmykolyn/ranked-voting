# Ranked Voting

## Table of Contents
- [About](#about)
- [Premise](#premise)
- [Notes](#notes)

## About
This repo includes tests and experiments that aim to give a better understanding of how the various styles/systems of ranked voting work.

## Premise
### Voting
Given a collection of voters, each voter prepares a ballot. This ballot MUST include a reference to EACH candidate, although the order of the references is at the discretion of the voter.

### Tallying
When all of the voters have voted, the ballots are tallied. During the initial tallying of votes, only the first/topmost candidate reference is considered. If any single candidate receives over 50% of the votes, then the election is complete (with the candidate in question being declared the winner). If none of the candidates receive more than 50% of the vote, then the candidate who received the fewest votes is removed. This candidate's ballots are adjusted (eg. the topmost candidate reference is removed) and redistributed amongst the remaining candidates. The process of tallying/redistributing continues until a single candidate captures more than 50% of the total votes.

### Ties
#### Fewest Votes
**4+ Candidates**
Given the case where there are 4 or more candidates remaining, no candidate has over 50% of the vote, and 2x candidates are tied for fewest votes, then the tied candidates shall be removed and their ballots will be redistributed amongst the remaining canadidates.

**3x Candidates**
Given the case where there are 3x candidates remaining, no candidate has over 50% of the votes, and 2x candidates are tied for fewest votes, then the tied candidates shall be removed and the remaining candidate will be declared the winner.

#### Most Votes
**2x Candidates**
Given the case where there are 2x candidates remaining, each with the same number of votes, then neither candidate shall be declared the winner.

## Notes
- Entities
-- Election
-- Candidate
-- Voter
-- Ballot
- An election has many Candidates
- An election has many Voters
- A Ballot belongs to a Voter
- A Ballot belongs to a Candidate
- A Candidate has many Voters through Ballots
