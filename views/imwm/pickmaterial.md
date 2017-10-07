# PICK MATERIAL DOCUMENT



## WHY WE NEED THIS PROCESS

- JIT REQUIREMENT
- QUICK PICKING BY ORDER REFERENCE
- PREVENT MISSING PART CAUSE STOP ORDER
- IMPROVE QUALITY IMPACT BY PREVENT WRONG PART PICK
- INPUT DATA FOR DATA CENTER BY MEASURING CYCLE MATERIAL SUPPLY 
- DATA ANALYSIS FOR IMPROVEMENT AND TARGET FOCUS FOLLOW UP
- TRACKING MOVEMENT OF MATERIAL AND OPERATOR



## BUSSINES CASE



 1.  USER/Actor: OPERTOR, SUPPERVISER

	2. OBJECT

    - TO# paper with MATERIAL PN
    - Material PN on Actual box
    - Material PN on Actual label
    - SUPPORT EQUI: DL-AXIST, DESTOP COMPUTER, MOBILE DEVICE, TABLET..

	3. PROCESS CASE

    - Op Login

    - Op Start Order

    - Mat PICK PACK by verify 3 place

    - Op Split Mat to 2 line cause 2 source

    - Op Done commit TO

    - Op Revert to pick again

      ​

      ```mermaid
      graph LR;
      	Op --> Login((Login))
      	Login --> Start((PP))
      	Login --> Split((Split))
      	Start --> Done((Commit Done TO#))
      	Split --> Done((Commit Done TO#))
      	
      	


      ```

      ​

	4. SEQUENCE

    ``` mermaid
    sequenceDiagram
        participant Op
        participant Sys
        Op->> Sys: Login
        Sys->>Op: Success
        Op->> Sys: TO#
        Note left of Op: START Order
        Sys->>Sys: Load from Saplink
        Sys->>Op: Show list TO
        Sys->>Sys: Check Fact to filter undone Mat
        Sys->>Op: Show list TO REfresh
        Op->>Op: check if ready to start
        Note left of Op: Làm nha
        

    ```

    ​













