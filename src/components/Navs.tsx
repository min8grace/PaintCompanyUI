import {
    Box,
    Flex,
    Text,
    Stack,
    Collapse,
    Icon,
    Popover,
    PopoverTrigger,
    PopoverContent,
    useColorModeValue,
    useBreakpointValue,
    useDisclosure,
} from '@chakra-ui/react'
import {
    ChevronDownIcon,
    ChevronRightIcon,
} from '@chakra-ui/icons'
import { ILogInUser, IUser } from '../types'
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import useUser from '../lib/useUser';
import { useNavigate } from 'react-router-dom';
interface DesktopNavProps {
    user: ILogInUser | undefined;
}

export const DesktopNav: React.FC<DesktopNavProps> = ({ user }) => {
    const linkColor = useColorModeValue('gray.600', 'gray.200')
    const linkHoverColor = useColorModeValue('gray.800', 'white')
    const popoverContentBgColor = useColorModeValue('white', 'gray.800')
    return (
        <Stack direction={'row'} spacing={4}>
            {NAV_ITEMS.map((navItem) => {
                // Check if the label is 'Users & Roles' and user's roleId is not 4
                if (navItem.label === 'Users & Roles' && user?.data.roleId !== 4) {
                    return null; // Hide the menu item
                }

                return (
                    <Box key={navItem.label}>
                        <Popover trigger={'hover'} placement={'bottom-start'}>
                            <PopoverTrigger>
                                <Box
                                    as="a"
                                    p={2}
                                    href={navItem.href ?? '#'}
                                    fontSize={'md'}
                                    fontWeight={500}
                                    color={linkColor}
                                    _hover={{
                                        textDecoration: 'none',
                                        color: linkHoverColor,
                                    }}>
                                    {navItem.label}
                                </Box>
                            </PopoverTrigger>

                            {navItem.children && (
                                <PopoverContent
                                    border={0}
                                    boxShadow={'xl'}
                                    bg={popoverContentBgColor}
                                    p={4}
                                    rounded={'xl'}
                                    minW={'sm'}>
                                    <Stack>
                                        {navItem.children.map((child) => (
                                            <DesktopSubNav key={child.label}  {...child} />
                                        ))}
                                    </Stack>
                                </PopoverContent>
                            )}
                        </Popover>
                    </Box>
                );
            })}
        </Stack>
    );
}

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
    let url = href;
    return (
        <Box
            as="a"
            href={url}
            role={'group'}
            display={'block'}
            p={2}
            rounded={'md'}
            _hover={{ bg: useColorModeValue('blue.50', 'gray.900') }}>
            <Stack direction={'row'} align={'center'}>
                <Box>
                    <Text
                        transition={'all .3s ease'}
                        _groupHover={{ color: 'blue.400' }}
                        fontWeight={500}>
                        {label}
                    </Text>
                    <Text fontSize={'sm'}>{subLabel}</Text>
                </Box>
                <Flex
                    transition={'all .3s ease'}
                    transform={'translateX(-10px)'}
                    opacity={0}
                    _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
                    justify={'flex-end'}
                    align={'center'}
                    flex={1}>
                    <Icon color={'blue.400'} w={5} h={5} as={ChevronRightIcon} />
                </Flex>
            </Stack>
        </Box>
    )
}

export const MobileNav = () => {

    const { userLoading, isLoggedIn, user } = useUser();
    return (
        <Stack bg={useColorModeValue('white', 'gray.800')} p={4} display={{ md: 'none' }}>
            {NAV_ITEMS.map((navItem) => {

                // Check if the label is 'Users & Roles' and user's roleId is not 4
                if (navItem.label === 'Users & Roles' && user?.data.roleId !== 4) {
                    return null; // Hide the menu item
                }
                return ((
                    <MobileNavItem key={navItem.label} {...navItem} />
                ))
            })}
        </Stack>
    )
}

const MobileNavItem = ({ label, children, href }: NavItem) => {
    const { isOpen, onToggle } = useDisclosure()

    return (
        <Stack spacing={4} onClick={children && onToggle}>
            <Box
                py={2}
                as="a"
                href={href ?? '#'}
                justifyContent="space-between"
                alignItems="center"
                _hover={{
                    textDecoration: 'none',
                }}>
                <Text fontWeight={600} color={useColorModeValue('gray.600', 'gray.200')}>
                    {label}
                </Text>
                {children && (
                    <Icon
                        as={ChevronDownIcon}
                        transition={'all .25s ease-in-out'}
                        transform={isOpen ? 'rotate(180deg)' : ''}
                        w={6}
                        h={6}
                    />
                )}
            </Box>

            <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
                <Stack
                    mt={2}
                    pl={4}
                    borderLeft={1}
                    borderStyle={'solid'}
                    borderColor={useColorModeValue('gray.200', 'gray.700')}
                    align={'start'}>
                    {children &&
                        children.map((child) => (
                            <Box as="a" key={child.label} py={2} href={child.href}>
                                {child.label}
                            </Box>
                        ))}
                </Stack>
            </Collapse>
        </Stack>
    )
}

interface NavItem {
    label: string
    subLabel?: string
    children?: Array<NavItem>
    href?: string
}

const NAV_ITEMS: Array<NavItem> = [
    {
        label: 'Home',
        href: '/',
    },
    {
        label: 'Paint Stock',
        children: [
            {
                label: 'Paint Stock List',
                subLabel: '',
                href: '/PaintStockList/',
            },
        ],
    },
    {
        label: 'Users & Roles',
        children: [
            {
                label: 'Users',
                subLabel: '',
                href: '/UserRole/Users/',
            },
            {
                label: 'Roles',
                subLabel: '',
                href: '/UserRole/Roles/',
            },
        ],
    }
]