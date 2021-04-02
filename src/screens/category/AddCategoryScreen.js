// react
import React, { Component } from "react";
import {
    View,
    TouchableOpacity,
    TextInput,
} from "react-native";

// firebase
import { firebase, userRef } from "../../database";

// redux
import { connect } from "react-redux";
import { 
  changeType, 
  changeName, 
  openDialog, 
  openIconDialog, 
  selectIcon, 
  closeIconDialog, 
  clearSearchText, 
  workWithSubCategory, 
  chooseCategory 
} from "../../redux/actions";

// other packages
import { Avatar, Accessory, ListItem } from "react-native-elements";
import Swipeout from "react-native-swipeout";

// components
import {
  String,
  ScreenView,
  Space,
  Title,
  AddWalletKindSelect,
  RoundedView,
  Button1,
} from "../../components/Basic";

import IconImage, { findIcon } from "../../assets";
//import AddSubcategoryDialog from "../components/AddSubcategoryDialog";
//import ChooseIconDialog from '../components/ChooseIconDialog';

// constants
import { 
  colors,
  sizeFactor,
  styles, 
} from "../../constants";

class AddCategoryScreen extends Component {
    constructor() {
        super();
    }

    addSubcategory = async(parentCategory) => {
        let uid = 'none';
        if(firebase.auth().currentUser) {
            uid = firebase.auth().currentUser.uid;
        }
        const userCategoryRef = userRef.child(uid).child('Category')
        
        const subCategories = this.props.addedSubCategories;
        console.log("ad\n ");
        console.log(this.props.addedSubCategories);
        const userSubcategoryRef = userCategoryRef.child(this.props.chosenCategory.key).child('SubCategories/');
        console.log("ref " + userSubcategoryRef);
        //let update = {};
        await subCategories.map(item => {
            userSubcategoryRef.push({
                CategoryName: item.categoryName,
                Icon: item.icon,
                TypeID: this.props.chosenCategory.TypeID,
                IsDeleted: false
            });
            //console.log("pid " + parentCategory.key);
        })
        this.props.reloadAddedSubCategories();
    }

    createCategory = async() => {
        const name = this.props.categoryName;
        const type =
            this.props.selectedType == 0 ? "001" : this.props.selectedType == 1 ? "002" : "003";
        const icon = IconImage[this.props.selectedIcon.addIndex].type;

        let uid = 'none';
        if(firebase.auth().currentUser) {
            uid = firebase.auth().currentUser.uid;
        }
        const userCategoryRef = userRef.child(uid).child('Category');
        
        await userCategoryRef.push({
            CategoryName: name,
            Icon: icon,
            ParentID: "",
            TypeID: type,
            IsDeleted: false
        }).then(item => {
            item.once('value', (snapshot) => {
                console.log(snapshot);
                const category = {
                    key: item.key,
                    categoryName: snapshot.toJSON().CategoryName,
                    icon: snapshot.toJSON().Icon,
                    isDeleted: snapshot.toJSON().IsDeleted,
                    parentID: snapshot.toJSON().ParentID,
                    typeID: snapshot.toJSON().TypeID
                }
                console.log("###")
                console.log(category);
                this.props.chooseCategory(category);
            });
            
            console.log(this.props.chosenCategory);
            
        });
        //console.log(category);
        this.addSubcategory(this.props.chosenCategory);
        // if searching, don't find a category, user can add category immediately by pressing themdanhmuc, 
        // after adding, clear search text to stop searchings
        this.props.clearSearchText();
        this.props.navigation.goBack();
    };

    renderSubCategoriesView = () => {
        const subCategories = this.props.subCategories;
        return (
            <View>
                {subCategories.map((item, i) => (
                    <TouchableOpacity>
                        <ListItem
                            key={item.key}
                            title={item.categoryName}
                            leftAvatar={{
                                source: findIcon(item.icon),
                                width: sizeFactor * 2.5,
                                height: sizeFactor * 2.5,
                                rounded: false,
                            }}
                            chevron={
                                // if button is used to add new sub category, don't show the right arrow (set false), else set size for it
                                item.categoryName == "Thêm mới" ? false : { size: sizeFactor * 1.5 }
                            }
                            contentContainerStyle={{ marginHorizontal: 0 }}
                            rightContentContainerStyle={{ marginHorizontal: 0 }}
                            containerStyle={{ paddingHorizontal: 0 }}
                            titleStyle={{ fontSize: sizeFactor }}
                            pad={sizeFactor}
                        />
                    </TouchableOpacity>
                ))}
            </View>
        );
    };

    openIconDialog = () => {
        // reset selectedIndex whenever open icon dialog
        // b/c if choose icon and close dialog, without reseting, selectedIndex != addIndex (expect ==)
        this.props.selectIcon(this.props.selectedIcon.addIndex);
        this.props.openIconDialog();
    }

    openAddSubDialog = () => {
        this.props.workWithSubCategory();
        this.setState({
            deleteBtn_name: ""
        })

        this.props.openDialog();
    }

    componentDidMount() {
        this.props.closeIconDialog();
        //this.props.selectIcon(9);
    }

    render() {
        const swipeSettings = {
            autoClose: true,
            onClose: (secID, rowID, direction) => {},
            onOpen: (secID, rowID, direction) => {},
            right: [
                {
                    onPress: () => {},
                    text: "Xóa",
                    type: "delete",
                },
            ],
        };
        const subCategoriesView = this.renderSubCategoriesView();
        
        const iconPath = IconImage[this.props.selectedIcon.addIndex].iconPath;

        return (
            <ScreenView>
                {/* <ChooseIconDialog /> */}
                <View
                    style={{
                        justifyContent: "center",
                        alignContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Space />
                    <Space />
                    <Space />
                    <TouchableOpacity onPress={() => { this.openIconDialog()}}>
                        <Avatar
                            size={sizeFactor * 6}
                            avatarStyle={{
                                width: sizeFactor * 4.5,
                                height: sizeFactor * 4.5,
                                marginLeft: sizeFactor * 0.75,
                                marginTop: sizeFactor * 0.75,
                            }}
                            source={iconPath}
                        >
                            <Accessory size={sizeFactor * 1.75} />
                        </Avatar>
                    </TouchableOpacity>
                </View>
                <Title style={{ marginLeft: sizeFactor * 1.5 }}>Chi tiết danh mục</Title>
                <RoundedView>
                    <String style={{ fontWeight: "bold" }}>Tên danh mục</String>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Danh mục của tôi"
                        onChangeText={(text) => this.props.changeName(text)}
                    />
                    <Space />
                    <String style={{ fontWeight: "bold" }}>Loại chi tiêu</String>
                    <AddWalletKindSelect
                        buttons={["Vay/Trả", "Chi tiêu", "Thu nhập"]}
                        selectedIndex={this.props.selectedType}
                        onPress={(index) => this.props.changeType(index)}
                    />
                    <Space />
                    <String style={{ fontWeight: "bold" }}>Danh mục con</String>

                    

                    <Swipeout style={{ marginBottom: sizeFactor / 2 }} {...swipeSettings}>
                        {subCategoriesView}
                    </Swipeout>
                    <TouchableOpacity onPress={() => this.openAddSubDialog()}>
                        <View
                            style={{
                                backgroundColor: "white",
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <Avatar
                                size={sizeFactor * 3}
                                avatarStyle={{
                                    width: sizeFactor * 2.5,
                                    height: sizeFactor * 2.5,
                                    marginTop: sizeFactor * 0.25,
                                    marginLeft: sizeFactor * 0.25,
                                }}
                                source={require("../../assets/categories/themdanhmuccon.png")}
                            ></Avatar>
                            <String
                                style={{
                                    marginLeft: sizeFactor / 2,
                                    marginTop: sizeFactor * 0.75,
                                }}
                            >
                                Thêm danh mục con
                            </String>
                        </View>
                    </TouchableOpacity>
                </RoundedView>
                <Space />
                <Button1
                    color="white"
                    background={colors.blue}
                    style={{ marginHorizontal: sizeFactor }}
                    onPress={() => this.createCategory()}
                >
                    Lưu thay đổi
                </Button1>
                {/* <AddSubcategoryDialog></AddSubcategoryDialog> */}
            </ScreenView>
        );
    }
}

function mapStateToProps(state) {
    return {
        categoryName: state.categoryName,
        selectedType: state.selectedType,
        subCategories: state.subCategories,
        selectedIcon: state.selectedIcon,
        addedSubCategories: state.addedSubCategories,
        chosenCategory: state.chooseCategory
    };
}

function mapDispatchToProps(dispatch) {
    return {
        changeName: (text) => {
            dispatch(changeName(text));
        },
        changeType: (index) => {
            dispatch(changeType(index));
        },
        openDialog: () => {
            dispatch(openDialog());
        },
        openIconDialog: () => { dispatch(openIconDialog())},
        selectIcon: (index) => { dispatch(selectIcon(index))},
        closeIconDialog: () => { dispatch(closeIconDialog())},
        clearSearchText: () => { dispatch(clearSearchText())},
        workWithSubCategory: () => { dispatch(workWithSubCategory())},
        chooseCategory: (category) => { dispatch(chooseCategory(category))},
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCategoryScreen);
